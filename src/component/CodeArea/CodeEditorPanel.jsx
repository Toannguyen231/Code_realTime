import React from 'react';
import CodeEditor from '../Editor/CodeEditor';
import { FiCode, FiSettings, FiRotateCcw, FiMaximize2 } from 'react-icons/fi';

const CodeEditorPanel = ({ code, setCode }) => {
    return (
        <div className="code-editor-panel">
            <div className="editor-header">
                <div className="header-left">
                    <span className="icon-btn" style={{ color: '#2cbb5d' }}><FiCode /> Code</span>
                    <select className="lang-select">
                        <option>C++</option>
                        <option>Java</option>
                        <option>Python</option>
                    </select>
                    <span>Auto</span>
                </div>
                <div className="header-right">
                    <span className="icon-btn"><FiRotateCcw /></span>
                    <span className="icon-btn"><FiSettings /></span>
                    <span className="icon-btn"><FiMaximize2 /></span>
                </div>
            </div>
            
            <div className="editor-body" style={{ padding: 0 }}>
                {/* Reusing the existing CodeEditor but styling it to fit */}
                <CodeEditor code={code} setCode={setCode} />
            </div>

            <div className="editor-footer">
                <span>Saved</span>
                <span>Ln 1, Col 1</span>
            </div>
            <div style={{ backgroundColor: '#1a3a5c', color: '#fff', padding: '8px 12px', fontSize: '13px', textAlign: 'center' }}>
                You need to log in / sign up to run or submit
            </div>
        </div>
    );
};

export default CodeEditorPanel;
