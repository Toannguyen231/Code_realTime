import React from 'react';
import './CodeEditor.scss';
import { FiRotateCcw, FiCopy } from 'react-icons/fi';

const DEFAULT_CODE = {
  'C++': `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  'Python': `def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  'Java': `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  'JavaScript': `function main() {
    console.log("Hello, World!");
}

main();`,
};

const CodeEditor = ({ code, setCode, language }) => {
  const handleReset = () => {
    if (window.confirm('Reset code về mặc định?')) {
      setCode(DEFAULT_CODE[language] || '');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
  };

  const handleKeyDown = (e) => {
    // Tab → insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="editor-wrapper">
      {/* Toolbar */}
      <div className="editor-toolbar">
        <div className="editor-toolbar-left">
          <span className="toolbar-label">📝 {language}</span>
          <span className="toolbar-divider" />
          <span className="toolbar-label" style={{ color: 'var(--accent)', fontSize: '11px' }}>
            ⬤ Realtime sync
          </span>
        </div>
        <div className="editor-toolbar-right">
          <button className="toolbar-action-btn" onClick={handleCopy} title="Copy code">
            <FiCopy size={13} /> Copy
          </button>
          <button className="toolbar-action-btn" onClick={handleReset} title="Reset code">
            <FiRotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        id="code-editor-textarea"
        className="code-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Bắt đầu viết code..."
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};

export default CodeEditor;