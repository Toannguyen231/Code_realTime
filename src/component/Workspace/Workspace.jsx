import React from 'react';
import './Workspace.scss';
import ProblemDescription from '../ProblemDescription/ProblemDescription';
import CodeArea from '../CodeArea/CodeArea';

const Workspace = ({ code, setCode, output }) => {
    return (
        <div className="workspace-container">
            <div className="left-pane">
                <ProblemDescription />
            </div>
            <div className="right-pane">
                <CodeArea code={code} setCode={setCode} output={output} />
            </div>
        </div>
    );
};

export default Workspace;
