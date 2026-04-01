import React, { useState } from 'react';
import './CodeArea.scss';
import CodeEditorPanel from './CodeEditorPanel';
import ConsolePanel from './ConsolePanel';

const CodeArea = () => {
    const [code, setCode] = useState("class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};");

    return (
        <div className="code-area">
            <CodeEditorPanel code={code} setCode={setCode} />
            <ConsolePanel />
        </div>
    );
};

export default CodeArea;
