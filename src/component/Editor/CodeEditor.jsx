import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.scss';
import { FiRotateCcw, FiCopy } from 'react-icons/fi';
import { LANGUAGE_VERSION, LANGUAGE_KEY_BY_DISPLAY } from '../Header/constants';


const DEFAULT_CODE = {
  'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`,
  Python: `def main():\n  print("Hello, World!")\n\nif __name__ == "__main__":\n  main()`,
  Java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
  JavaScript: `function main() {\n  console.log("Hello, World!");\n}\n\nmain();`,
  TypeScript: `function main(): void {\n  console.log("Hello, World!");\n}\n\nmain();`,
  'C#': `using System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}`,
  PHP: `<?php\n\necho "Hello, World!\\n";\n\n?>`,
};

const CodeEditor = ({ code, setCode, language }) => {
  const languageKey = LANGUAGE_KEY_BY_DISPLAY[language] || language.toLowerCase();
  const monacoLanguage = languageKey;
  const languageVersion = LANGUAGE_VERSION[languageKey] || 'unknown';
  const editorRef = useRef(null);

  const handleReset = () => {
    if (window.confirm('Reset code về mặc định?')) {
      setCode(DEFAULT_CODE[language] || '');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => { });
  };

  const onMount = (monaco) => {
    editorRef.current = monaco;
    editorRef.current.focus();
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        <div className="editor-toolbar-left">
          <span className="toolbar-label">📝 {language} ({languageVersion})</span>
          <span className="toolbar-divider" />
        </div>
        <div className="editor-toolbar-right">
          <button className="toolbar-action-btn" onClick={handleCopy}>
            <FiCopy size={13} /> Copy
          </button>
          <button className="toolbar-action-btn" onClick={handleReset}>
            <FiRotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      <div className="monaco-editor-container">
        <Editor
          height="100%"
          language={monacoLanguage}
          theme="vs-dark"
          value={code}
          onChange={(value = '') => setCode(value)}
          onMount={onMount}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;