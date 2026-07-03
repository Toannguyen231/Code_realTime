export default function CodeWindow() {
  return (
    <div className="code-window-wrap" id="codeWindowWrap">
      <div className="code-window" id="codeWindow">
        <div className="code-titlebar">
          <div className="dots"><span /><span /><span /></div>
          <div className="filename">room-482 · two-sum.js</div>
          <div className="cursors-live">
            <div className="cursor-avatar" style={{ background: 'var(--cyan)' }}>T</div>
            <div className="cursor-avatar" style={{ background: 'var(--amber)' }}>L</div>
          </div>
        </div>
        <div className="code-body">
          <span className="ln">1</span><span className="com">// Toàn đang gõ...</span>
          {'\n'}
          <span className="ln">2</span><span className="kw">function</span> <span className="fn">twoSum</span>(<span className="var">nums</span>, <span className="var">target</span>) {'{'}{'\n'}
          <span className="ln">3</span>  <span className="kw">const</span> <span className="var">seen</span> = <span className="kw">new</span> <span className="fn">Map</span>();{'\n'}
          <span className="ln">4</span>  <span className="kw">for</span> (<span className="kw">let</span> <span className="var">i</span> = <span className="num">0</span>; <span className="var">i</span> &lt; <span className="var">nums</span>.length; <span className="var">i</span>++) {'{'}{'\n'}
          <span className="ln">5</span>    <span className="kw">const</span> <span className="var">need</span> = <span className="var">target</span> - <span className="var">nums</span>[<span className="var">i</span>];{'\n'}
          <span className="ln">6</span>    <span className="kw">if</span> (<span className="var">seen</span>.has(<span className="var">need</span>)) <span className="kw">return</span> [<span className="var">seen</span>.get(<span className="var">need</span>), <span className="var">i</span>];<span className="caret" />{'\n'}
          <span className="ln">7</span>    <span className="var">seen</span>.set(<span className="var">nums</span>[<span className="var">i</span>], <span className="var">i</span>);{'\n'}
          <span className="ln">8</span>  {'}'}{'\n'}
          <span className="ln">9</span>{'}'}{'\n'}
          <span className="ln">10</span><span className="com">// Linh: "gọn ghê, chạy thử test đi" <span className="tag-inline" style={{ background: 'var(--amber-glow)', color: 'var(--amber)' }}>● live</span></span>
        </div>
      </div>
    </div>
  );
}
