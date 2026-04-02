import React, { useState } from 'react';
import './OutputPanel.scss';
import { FiTerminal, FiCheckSquare, FiTrash2 } from 'react-icons/fi';

const OutputPanel = ({ output, isRunning }) => {
  const [activeTab, setActiveTab] = useState('console');

  const getStatus = () => {
    if (isRunning) return { label: 'Running', cls: 'running' };
    if (!output) return { label: 'Idle', cls: 'idle' };
    if (output.toLowerCase().includes('error')) return { label: 'Error', cls: 'error' };
    return { label: 'Accepted', cls: 'accepted' };
  };

  const status = getStatus();

  return (
    <div className="output-panel">
      {/* Tabs */}
      <div className="output-tabs">
        <div
          id="tab-console"
          className={`output-tab ${activeTab === 'console' ? 'active' : ''}`}
          onClick={() => setActiveTab('console')}
        >
          <FiTerminal size={12} />
          Console
        </div>
        <div
          id="tab-testcase"
          className={`output-tab ${activeTab === 'testcase' ? 'active' : ''}`}
          onClick={() => setActiveTab('testcase')}
        >
          <FiCheckSquare size={12} />
          Test Cases
        </div>

        <div className="output-tab-actions">
          <button className="btn-clear" title="Clear output">
            <FiTrash2 size={11} style={{ marginRight: 4 }} />
            Clear
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="output-body">
        {activeTab === 'console' ? (
          isRunning ? (
            <span className="console-output">⏳ Đang chạy code...</span>
          ) : output ? (
            <pre className={`console-output ${output.toLowerCase().includes('error') ? 'error' : 'success'}`}>
              {output}
            </pre>
          ) : (
            <span className="console-empty">Nhấn "Run Code" để chạy chương trình...</span>
          )
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            <p style={{ marginBottom: 8 }}>Chưa có test case nào được thêm.</p>
            <p style={{ color: 'var(--text-dim)' }}>Tính năng này sẽ được bổ sung khi kết nối backend.</p>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="output-status">
        <span className={`status-badge ${status.cls}`}>{status.label}</span>
        {output && !isRunning && (
          <span className="status-time">
            {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
