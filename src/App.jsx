import React, { useState } from 'react';
import './App.css';

import Header      from './component/Header/Header';
import Sidebar     from './component/Sidebar/Sidebar';
import CodeEditor  from './component/Editor/CodeEditor';
import OutputPanel from './component/OutputPanel/OutputPanel';

// Default code per language
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

const ROOM_ID = 'ABC-123';

function App() {
  const [language, setLanguage]   = useState('C++');
  const [code, setCode]           = useState(DEFAULT_CODE['C++']);
  const [output, setOutput]       = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Khi đổi ngôn ngữ → reset code về mẫu mặc định
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang] || '');
    setOutput('');
  };

  // Mock chạy code (sẽ kết nối backend thật sau)
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');

    // Giả lập gọi API backend ~1.2 giây
    await new Promise((r) => setTimeout(r, 1200));

    const mockOutput = {
      'C++':
        `g++ -o solution solution.cpp\n✅ Compilation successful\n\nRunning...\nHello, World!\n\nProcess finished with exit code 0`,
      'Python':
        `python3 solution.py\n\nHello, World!\n\nProcess finished with exit code 0`,
      'Java':
        `javac Main.java\n✅ Compilation successful\n\nRunning...\nHello, World!\n\nProcess finished with exit code 0`,
      'JavaScript':
        `node solution.js\n\nHello, World!\n\nProcess finished with exit code 0`,
    };

    setOutput(mockOutput[language] || 'Done.');
    setIsRunning(false);
  };

  return (
    <div className="app-shell">
      {/* ── Header ── */}
      <Header
        roomId={ROOM_ID}
        language={language}
        setLanguage={handleLanguageChange}
        onRun={handleRunCode}
        isRunning={isRunning}
      />

      {/* ── Main: Sidebar + Editor ── */}
      <div className="app-main">
        <Sidebar />

        <div className="editor-area">
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
          />

          {/* ── Output Panel ── */}
          <OutputPanel
            output={output}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
