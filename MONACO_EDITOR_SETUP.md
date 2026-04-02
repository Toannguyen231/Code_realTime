# Hướng dẫn tích hợp Monaco Editor và mỗi ngôn ngữ có option sẵn

Mục tiêu: cho phép chọn ngôn ngữ bằng option trong `Header`, hiển thị Monaco Editor ở `src/component/Editor/CodeEditor.jsx`, và in ra kết quả trong `OutputPanel`.

## 1. Cài đặt gói cần thiết

Tại thư mục `d:\test-demo-react\Project_code_realTime\app_code_realTime`, chạy:

```bash
npm install @monaco-editor/react monaco-editor
```

> Dự án đã có `monaco-editor`, nhưng cần thêm `@monaco-editor/react` để dùng Monaco trong React.

## 2. Đảm bảo `Header.jsx` cung cấp option ngôn ngữ

Trong `src/component/Header/Header.jsx`, dùng select list với một danh sách ngôn ngữ cố định:

```jsx
const LANGUAGES = ['C++', 'Python', 'Java', 'JavaScript'];

<select
  className="lang-select"
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
>
  {LANGUAGES.map((lang) => (
    <option key={lang} value={lang}>
      {lang}
    </option>
  ))}
</select>
```

App chính `src/App.jsx` sẽ giữ `language` trong state và đổi `code` mẫu khi chọn ngôn ngữ:

```jsx
const DEFAULT_CODE = {
  'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << \"Hello, World!\" << endl;\n  return 0;\n}`,
  Python: `def main():\n  print(\"Hello, World!\")\n\nif __name__ == \"__main__\":\n  main()`,
  Java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}`,
  JavaScript: `function main() {\n  console.log(\"Hello, World!\");\n}\n\nmain();`,
};

const handleLanguageChange = (lang) => {
  setLanguage(lang);
  setCode(DEFAULT_CODE[lang] || '');
  setOutput('');
};
```

## 3. Cập nhật `App.jsx` để xuất kết quả

Trong `src/App.jsx`, dùng state:

```jsx
const [language, setLanguage] = useState('C++');
const [code, setCode] = useState(DEFAULT_CODE['C++']);
const [output, setOutput] = useState('');
const [isRunning, setIsRunning] = useState(false);
```

Và hàm chạy code với output mock để in ra kết quả:

```jsx
const handleRunCode = async () => {
  setIsRunning(true);
  setOutput('');

  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockOutput = {
    'C++': `g++ solution.cpp && ./solution\nHello, World!`,
    Python: `python solution.py\nHello, World!`,
    Java: `javac Main.java && java Main\nHello, World!`,
    JavaScript: `node solution.js\nHello, World!`,
  };

  setOutput(mockOutput[language] || 'Output không xác định');
  setIsRunning(false);
};
```

Với `OutputPanel`, `output` sẽ hiển thị nội dung này khi `isRunning` false.

## 4. Cập nhật `CodeEditor.jsx` dùng Monaco Editor

Sửa `src/component/Editor/CodeEditor.jsx` như sau:

```jsx
import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.scss';
import { FiRotateCcw, FiCopy } from 'react-icons/fi';

const DEFAULT_CODE = {
  'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << \"Hello, World!\" << endl;\n  return 0;\n}`,
  Python: `def main():\n  print(\"Hello, World!\")\n\nif __name__ == \"__main__\":\n  main()`,
  Java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}`,
  JavaScript: `function main() {\n  console.log(\"Hello, World!\");\n}\n\nmain();`,
};

const languageMap = {
  'C++': 'cpp',
  Python: 'python',
  Java: 'java',
  JavaScript: 'javascript',
};

const CodeEditor = ({ code, setCode, language }) => {
  const monacoLanguage = languageMap[language] || 'plaintext';

  const handleReset = () => {
    if (window.confirm('Reset code về mặc định?')) {
      setCode(DEFAULT_CODE[language] || '');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        <div className="editor-toolbar-left">
          <span className="toolbar-label">📝 {language}</span>
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
```

## 5. Cho Output in ra kết quả rõ ràng

Trong `OutputPanel`, đảm bảo nó nhận `output` và hiển thị nội dung nếu có:

```jsx
{output ? (
  <pre className="console-output">{output}</pre>
) : (
  <span>Nhấn "Run Code" để xem kết quả</span>) }
```

Và trong `App.jsx`, truyền vào:

```jsx
<OutputPanel
  output={output}
  isRunning={isRunning}
  onClear={() => setOutput('')}
/>
```

## 6. CSS để Monaco editor hiển thị đúng

Trong `src/component/Editor/CodeEditor.scss`:

```css
.editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.monaco-editor-container {
  flex: 1;
  min-height: 0;
}
```

## 7. Chạy thử

```bash
npm install
npm run dev
```

Mở app, chọn ngôn ngữ từ dropdown, sửa code trong Monaco, nhấn `Run Code` và kiểm tra output hiện ra trong `OutputPanel`.

## 8. Ghi chú

- `Header.jsx` cần truyền `language` và `setLanguage` từ `App.jsx`.
- `CodeEditor.jsx` cần nhận `language`, `code`, `setCode`.
- `handleRunCode` hiện tại là mock; nếu bạn muốn xử lý thật, thay bằng API gọi backend hoặc sandbox.
