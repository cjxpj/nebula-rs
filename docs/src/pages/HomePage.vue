<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-name">NR 语言</h1>
      <p class="hero-text">参考手册</p>
      <p class="hero-tagline">Nebula 词库引擎的领域特定语言</p>
      <a class="hero-btn" href="#/v1.0/">开始阅读</a>
    </section>

    <section class="features">
      <div class="feature">
        <h3>简洁语法</h3>
        <p>NR 采用直观的触发词-响应模式，头部空行分隔结构，让词库编写像写笔记一样自然。</p>
      </div>
      <div class="feature">
        <h3>动态类型</h3>
        <p>支持整数、浮点、字符串、布尔、对象、函数等类型，运行时自动推断，灵活高效。</p>
      </div>
      <div class="feature">
        <h3>模块化</h3>
        <p>支持文件/目录引入、跨包调用、热更新，轻松构建大型自动化文本生成系统。</p>
      </div>
    </section>

    <section class="tools">
      <h2>工具</h2>
      <p><a href="./vscode-nr/nr-language-1.0.0.vsix">下载 VS Code 语法高亮扩展 (.vsix)</a></p>
      <p>安装：VS Code → <code>Ctrl+Shift+P</code> → "Install from VSIX..." → 选择下载的文件</p>
    </section>

    <section class="info">
      <h2>项目信息</h2>
      <ul>
        <li><strong>引擎</strong>：Nebula 词库引擎</li>
        <li><strong>实现语言</strong>：Rust</li>
        <li><strong>许可证</strong>：Copyright (c) 2025 保留所有权利</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 64px 24px 48px;
}

.hero-name {
  font-size: 3em;
  font-weight: 700;
  color: var(--color-brand);
  border: none;
  padding: 0;
}

.hero-text {
  font-size: 2.5em;
  font-weight: 300;
  margin-top: 4px;
}

.hero-tagline {
  font-size: 1.2em;
  color: var(--color-text-muted);
  margin: 16px 0 32px;
}

.hero-btn {
  display: inline-block;
  padding: 10px 28px;
  background: var(--color-brand);
  color: #fff;
  border-radius: 20px;
  font-size: 1em;
  font-weight: 500;
  transition: background 0.2s;
}

.hero-btn:hover {
  background: var(--color-brand-light);
  color: #fff;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  padding: 0 24px 48px;
}

.feature {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.feature h3 {
  margin-top: 0;
  font-size: 1.1em;
}

.feature p {
  font-size: 0.9em;
  color: var(--color-text-muted);
}

.tools, .info {
  padding: 0 24px 32px;
}
</style>
