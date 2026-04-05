import React, { useState } from 'react';
import './App.css';

import Header from './component/Header/Header';
import Sidebar from './component/Sidebar/Sidebar';
import CodeEditor from './component/Editor/CodeEditor';
import OutputPanel from './component/OutputPanel/OutputPanel';
import { executeCode } from './component/Header/api';

// Code mẫu mặc định cho từng ngôn ngữ
const DEFAULT_CODE = {
  'C++': `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  'Python': `def main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()`,
  'Java': `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  'JavaScript': `function main() {\n    console.log("Hello, World!");\n}\n\nmain();`,
  'TypeScript': `function main(): void {\n    console.log("Hello, World!");\n}\n\nmain();`,
  'C#': `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}`,
  'PHP': `<?php\n\necho "Hello, World!\\n";\n\n?>`,
};

const ROOM_ID = 'ABC-123';

function CodeApp() {
    const [language, setLanguage] = useState('C++');
    const [code, setCode] = useState(DEFAULT_CODE['C++']);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    // Khi đổi ngôn ngữ → reset code về mẫu mặc định
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setCode(DEFAULT_CODE[lang] || '');
        setOutput('');
    };

    const runJavaScript = (source) => {
        const logs = [];
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;

        const safeConsole = {
            log: (...args) => logs.push(args.map((item) => String(item)).join(' ')),
            error: (...args) => logs.push(args.map((item) => String(item)).join(' ')),
        };

        try {
            // Ghi đè console tạm thời để thu log
            console.log = safeConsole.log;
            console.error = safeConsole.error;

            new Function(source)();
        } catch (error) {
            logs.push(`Error: ${error.message}`);
        } finally {
            console.log = originalConsoleLog;
            console.error = originalConsoleError;
        }

        return logs.length > 0 ? logs.join('\n') : 'Chạy xong, không có output.';
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput('');

        try {
            const result = await executeCode(language, code);

            // Nếu API trả về lỗi RapidAPI hoặc không kèm token (thiếu key, limit vượt mức)
            if (result.message && !result.status) {
                setOutput(`Lỗi API: ${result.message}`);
                return;
            }

            // Xử lý output theo cấu trúc của Judge0
            if (result.compile_output) {
                setOutput(result.compile_output); // Lỗi biên dịch (C++, Java)
            } else if (result.stderr) {
                setOutput(result.stderr); // Lỗi khi chạy (Python, JS)
            } else if (result.stdout !== null && result.stdout !== undefined) {
                setOutput(result.stdout || "Done."); // Kết quả trả về thành công
            } else if (result.status && result.status.description) {
                setOutput(`Trạng thái: ${result.status.description}`); // Các fallback khác như Time Limit Exceeded
            } else {
                setOutput(JSON.stringify(result, null, 2));
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    // Xóa output console
    const handleClear = () => {
        setOutput('');
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
                        onClear={() => setOutput('')}
                    />
                </div>
            </div>
        </div>
    );
}

export default CodeApp;
