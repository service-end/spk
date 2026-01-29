<script lang="ts">
  import { runSource } from 'spk-core';

  const defaultSource = `세계수 교단의 제사장 네르에요

흐에에에에에에에에엥 흐에에에에에에에에에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐 스피키 네르지 마세요 흐에에에에에에에에에에엥 흐에에에에에에에에에에엥
흐 흐에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐에에에에에에에에에엥 흐에에에에에에에에에에에에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐에에에에에에에에에엥 흐에에에에에에에에에에에에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐흐 스피키 네르지 마세요 흐에에에에에에에에에에엥흐에엥
흐 흐흐 쪼아요 쪼아요 물걸레질 쪼아요
흐에에에에엥 흐에에에에에에에에에에엥흐에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐에에에에엥 흐에에에에에에에에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐 스피키 네르지 마세요 흐에에에에에에에에엥 흐에에에에에에에에에에엥
흐 흐에에에에에에에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐 스피키 네르지 마세요 흐에에에에에에에에에에엥 흐에에에에에에에에에에엥
흐흐 스피키 네르지 마세요 흐에에에에에에에에에에엥흐에엥
흐 흐흐 쪼아요 쪼아요 물걸레질 쪼아요
흐 흐에에에에에에에에에에엥흐에에에에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐에에에에에에에에에엥 흐에에에에에에에에에에에에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐에에에에에에에에에에엥 흐에에에에에에에에에에엥 쪼아요 쪼아요 물걸레질 쪼아요
흐에에에엥 흐에에에에에에에에에에엥흐에엥 쪼아요 쪼아요 물걸레질 쪼아요

이단 척결의 시간입니다`;

  let source = defaultSource;
  let output = '';
  let status = '';
  let statusOk = true;
  let inputText = '';

  function run() {
    const result = runSource(source, { input: inputText });
    output = result.output;
    status = result.message;
    statusOk = result.success;
  }
</script>

<main>
  <header>
    <h1>스핔</h1>
    <p class="subtitle">세계수 교단 설교용 언어</p>
  </header>

  <div class="panels">
    <section class="editor-panel">
      <div class="panel-header">
        <h2>제사장의 설교문</h2>
        <button class="run-btn" on:click={run}>실행</button>
      </div>
      <textarea
        class="source"
        bind:value={source}
        spellcheck="false"
        placeholder="세계수 교단의 제사장 네르에요..."
      ></textarea>
      <div class="input-row">
        <label for="stdin">입력 (스핔 사용 시)</label>
        <input id="stdin" type="text" bind:value={inputText} placeholder="입력 문자열" />
      </div>
    </section>

    <section class="output-panel">
      <h2>결과</h2>
      <div class="status" class:ok={statusOk} class:err={!statusOk}>
        {status || '—'}
      </div>
      <pre class="output">{output || '(출력 없음)'}</pre>
    </section>
  </div>
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: 'Noto Sans KR', sans-serif;
    background: #f5f0e6;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(72, 120, 72, 0.15), transparent),
      linear-gradient(180deg, #f5f0e6 0%, #ebe4d4 50%, #e5dcc8 100%);
    color: #2c2416;
  }

  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #4a7c4a;
    position: relative;
  }

  header::before,
  header::after {
    content: '✦';
    position: absolute;
    bottom: -0.6rem;
    color: #8b7355;
    font-size: 0.8rem;
  }

  header::before {
    left: 50%;
    transform: translate(-2.5rem, 0);
  }

  header::after {
    right: 50%;
    transform: translate(2.5rem, 0);
  }

  .tree {
    font-size: 2.5rem;
    margin-bottom: 0.25rem;
    filter: drop-shadow(0 2px 4px rgba(74, 124, 74, 0.3));
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0;
    color: #2d5a27;
    letter-spacing: 0.02em;
    text-shadow: 0 1px 2px rgba(45, 90, 39, 0.2);
  }

  .subtitle {
    margin: 0.5rem 0 0;
    font-size: 1rem;
    color: #5c5244;
  }

  .byline {
    margin: 0.35rem 0 0;
    font-size: 0.85rem;
    color: #8b7355;
    font-style: italic;
  }

  .panels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 900px) {
    .panels {
      grid-template-columns: 1fr;
    }
  }

  .editor-panel,
  .output-panel {
    background: rgba(255, 252, 245, 0.85);
    border: 1px solid #c4b8a4;
    border-radius: 10px;
    padding: 1.25rem;
    box-shadow: 0 2px 8px rgba(44, 36, 22, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 0.75rem;
    color: #4a7c4a;
  }

  .panel-header h2 {
    margin: 0;
  }

  .run-btn {
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
    color: #f5f0e6;
    background: linear-gradient(180deg, #3d6b3d 0%, #2d5a27 100%);
    border: 1px solid #2d4a24;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 2px 4px rgba(45, 90, 39, 0.3);
  }

  .run-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(45, 90, 39, 0.35);
  }

  .run-btn:active {
    transform: translateY(0);
  }

  .source {
    width: 100%;
    min-height: 320px;
    padding: 1rem;
    font-family: 'Noto Sans KR', 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.55;
    background: #fffef9;
    border: 1px solid #c4b8a4;
    border-radius: 8px;
    color: #2c2416;
    resize: vertical;
  }

  .source::placeholder {
    color: #8b7355;
    opacity: 0.7;
  }

  .source:focus {
    outline: none;
    border-color: #4a7c4a;
    box-shadow: 0 0 0 2px rgba(74, 124, 74, 0.2);
  }

  .input-row {
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .input-row label {
    font-size: 0.85rem;
    color: #5c5244;
    white-space: nowrap;
  }

  .input-row input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    font-family: inherit;
    background: #fffef9;
    border: 1px solid #c4b8a4;
    border-radius: 6px;
    color: #2c2416;
  }

  .input-row input:focus {
    outline: none;
    border-color: #4a7c4a;
  }

  .status {
    font-size: 0.85rem;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
    min-height: 1.5rem;
  }

  .status.ok {
    color: #2d5a27;
  }

  .status.err {
    color: #8b4513;
  }

  .output {
    margin: 0;
    padding: 1rem;
    font-family: 'JetBrains Mono', 'Noto Sans KR', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    background: #faf8f2;
    border: 1px solid #e0d6c4;
    border-radius: 8px;
    white-space: pre-wrap;
    word-break: break-all;
    min-height: 200px;
    color: #3d3528;
  }
</style>
