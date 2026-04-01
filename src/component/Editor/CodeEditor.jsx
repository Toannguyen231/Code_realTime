import React from "react";

const CodeEditor = ({ code, setCode }) => {
    return (
        <textarea
            className="code-textarea"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Viết code ở đây..."
            spellCheck="false"
            style={{
                width: "100%",
                height: "100%",
                fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
                fontSize: "14px",
                padding: "16px",
                border: "none",
                outline: "none",
                backgroundColor: "#282828",
                color: "#f8fafc",
                resize: "none",
                boxSizing: "border-box"
            }}
        />
    );
}

export default CodeEditor;