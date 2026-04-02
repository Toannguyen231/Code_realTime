import React, { useState, useEffect } from 'react';
import { FiCheckSquare, FiTerminal } from 'react-icons/fi';

const ConsolePanel = ({ output }) => {
    const [activeTab, setActiveTab] = useState('testcase');
    const [testcases, setTestcases] = useState({
        l1: "[2,4,3]",
        l2: "[5,6,4]"
    });

    // Tự động chuyển qua tab Test Result khi có output mới
    useEffect(() => {
        if (output) {
            setActiveTab('result');
        }
    }, [output]);

    return (
        <div className="console-panel">
            <div className="console-tabs">
                <div 
                    className={`tab ${activeTab === 'testcase' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('testcase')}
                    style={{ cursor: 'pointer' }}
                >
                    <FiCheckSquare color={activeTab === 'testcase' ? "#2cbb5d" : "gray"} /> Testcase
                </div>
                <div 
                    className={`tab ${activeTab === 'result' ? 'active' : ''}`}
                    onClick={() => setActiveTab('result')}
                    style={{ cursor: 'pointer' }}
                >
                    <FiTerminal color={activeTab === 'result' ? "#2cbb5d" : "gray"} /> Test Result
                </div>
            </div>
            <div className="console-body" style={{ alignItems: 'flex-start', justifyContent: 'flex-start', whiteSpace: 'pre-wrap', overflow: 'auto' }}>
                {activeTab === 'testcase' ? (
                    <div style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '13px', color: '#eff2f6', marginBottom: '8px' }}>l1 =</div>
                            <input 
                                type="text"
                                style={{ width: '100%', backgroundColor: '#ffffff12', border: '1px solid #ffffff12', padding: '8px', borderRadius: '4px', color: '#eff2f6', fontFamily: 'monospace', outline: 'none' }}
                                value={testcases.l1}
                                onChange={(e) => setTestcases({...testcases, l1: e.target.value})}
                            />
                        </div>
                        <div>
                            <div style={{ fontSize: '13px', color: '#eff2f6', marginBottom: '8px' }}>l2 =</div>
                            <input 
                                type="text"
                                style={{ width: '100%', backgroundColor: '#ffffff12', border: '1px solid #ffffff12', padding: '8px', borderRadius: '4px', color: '#eff2f6', fontFamily: 'monospace', outline: 'none' }}
                                value={testcases.l2}
                                onChange={(e) => setTestcases({...testcases, l2: e.target.value})}
                            />
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '8px' }}>
                        {output || "Bạn chưa chạy code."}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsolePanel;
