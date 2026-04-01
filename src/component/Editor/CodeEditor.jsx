import React from "react";

const CodeEditor = ({ code, setCode }) => {
    return (
        <div className="EditCode">
            <textarea
                className="code-textarea"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Viết code ở đây..."
                spellCheck="false"
                rows={20}
                style={{
                    width: "100%",
                    minHeight: "calc(100vh - 220px)",
                    fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace",
                    fontSize: "14px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: "#0f172a",
                    color: "#f8fafc",
                    resize: "vertical"
                }}
            />
        </div>
    );
}

export default CodeEditor;