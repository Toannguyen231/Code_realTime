import React, { useState } from 'react';
import Navbar from './component/Navbar/Navbar'
import Workspace from './component/Workspace/Workspace'
import './App.css'

function App() {
  const [code, setCode] = useState("class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        // Viết code ở đây\n    }\n};");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Đang chạy code...\n");
    
    // Giả lập kết nối API tới Backend để compile/run code
    setTimeout(() => {
      setOutput("Output:\n[7, 0, 8]\n\nCode đã chạy thành công!");
      setIsRunning(false);
    }, 1000);
  };

  return (
    <>
      <Navbar onRun={handleRunCode} isRunning={isRunning} />
      <Workspace code={code} setCode={setCode} output={output} />
    </>
  )
}

export default App
