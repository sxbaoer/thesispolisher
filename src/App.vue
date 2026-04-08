<script setup>
// 这里是逻辑代码，暂时不需要修改
</script>

<template>
  <div class="container">
    <div class="card">
      <h1 class="gradient-text">Hello World</h1>
      <p class="subtitle">如果看到这行字，说明部署成功了！🎉</p>
      <button class="cta-button">开始探索</button>
    </div>
  </div>
</template>

<style scoped>
/* 1. 布局与背景 */
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 一个漂亮的渐变背景 */
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  font-family: 'Arial', sans-serif;
}

/* 2. 卡片样式 */
.card {
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 1s ease-out;
}

/* 3. 文字渐变动画 */
.gradient-text {
  font-size: 3rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textShine 3s linear infinite;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #555;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

/* 4. 按钮样式与交互 */
.cta-button {
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  border: none;
  padding: 12px 30px;
  color: white;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.6);
}

/* --- 动画定义 --- */

/* 背景渐变流动 */
@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 文字色彩流动 */
@keyframes textShine {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* 卡片淡入效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>