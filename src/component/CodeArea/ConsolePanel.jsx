import React from 'react';
import { FiCheckSquare, FiTerminal } from 'react-icons/fi';

const ConsolePanel = () => {
    return (
        <div className="console-panel">
            <div className="console-tabs">
                <div className="tab active"><FiCheckSquare color="#2cbb5d" /> Testcase</div>
                <div className="tab"><FiTerminal color="#2cbb5d" /> Test Result</div>
            </div>
            <div className="console-body">
                You must run your code first
            </div>
        </div>
    );
};

export default ConsolePanel;
