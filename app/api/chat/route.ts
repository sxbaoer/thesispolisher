import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. 获取前端传来的文字
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: '请输入内容' }, { status: 400 });
    }

    // 2. 给 AI 的人设（这是核心！）
    const systemPrompt = `
    你是一位拥有20年经验的顶级英文学术期刊编辑。
    你的任务是润色用户提供的文本，使其符合学术发表标准。
    要求：
    1. 修正语法、拼写错误。
    2. 替换口语化词汇为学术词汇（如把 "look into" 改为 "investigate"）。
    3. 优化句子结构，使其更流畅。
    4. 保持客观语气。
    直接输出润色后的英文文本，不要解释。
    `;

    // 3. 调用阿里云大模型 API
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ALIBABA_CLOUD_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.MODEL_NAME || 'qwen-plus',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        temperature: 0.3 // 低创造性，保证学术严谨
      })
    });

    const data = await response.json();
    // 打印结果
    // console.log("阿里云返回的数据:", data);
    
    // 4. 返回结果
    const polishedText = data.choices[0].message.content;
    return NextResponse.json({ result: polishedText });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: '服务繁忙' }, { status: 500 });
  }
}