import React, { useState } from 'react';
import './CodeArea.scss';
import CodeEditorPanel from './CodeEditorPanel';
import ConsolePanel from './ConsolePanel';

const CodeArea = ({ code, setCode, output }) => {
    return (
        <div className="code-area">
            <CodeEditorPanel code={code} setCode={setCode} />
            <ConsolePanel output={output} />
        </div>
    );
};

export default CodeArea;
