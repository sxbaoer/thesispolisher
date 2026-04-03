'use client';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePolish = async () => {
      if (!input.trim()) return;

      // --- 新增代码开始 ---
      // 1. 获取当前次数
      let count = localStorage.getItem('polish_count');
      let currentCount = count ? parseInt(count) : 0;

      // 2. 检查是否超过限制（比如 3 次）
      if (currentCount >= 30) {
        alert("⚠️ 免费额度已用完！\n\n请联系管理员开通会员（演示版）");
        return; // 直接停止，不调用 API
      }
      // --- 新增代码结束 ---
      
      setLoading(true);
      setOutput(''); 

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input }),
        });
        
        const data = await res.json();
        if (data.result) {
          setOutput(data.result);
          // --- 新增代码：成功后次数+1 ---
          localStorage.setItem('polish_count', (currentCount + 1).toString());
          // --- 新增结束 ---
        } else {
          alert('出错了：' + data.error);
        }
      } catch (err) {
        alert('网络错误，请检查网络');
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部标题 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
            ThesisPolisher <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-gray-600">专为非英语母语学者打造的学术润色神器</p>
        </div>

        {/* 核心操作区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          
          {/* 左侧输入 */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
              原始文本
            </label>
            <textarea
              className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition text-gray-700 text-sm leading-relaxed"
              placeholder="在此粘贴你的论文片段（支持中文或英文）..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* 右侧输出 */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
              润色结果
            </label>
            <div className="flex-1 p-4 bg-blue-50/30 border border-blue-100 rounded-xl overflow-auto text-gray-800 text-sm leading-relaxed relative">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              ) : null}
              {output || <span className="text-gray-400 italic">等待润色...</span>}
            </div>
          </div>
        </div>

        {/* 按钮 */}
        <div className="mt-8 text-center">
          <button
            onClick={handlePolish}
            disabled={loading}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'AI 正在思考中...' : '✨ 一键学术润色'}
          </button>
          <p className="mt-4 text-xs text-gray-400">
            基于通义千问大模型 · 免费试用中
          </p>
        </div>
      </div>
    </main>
  );
}