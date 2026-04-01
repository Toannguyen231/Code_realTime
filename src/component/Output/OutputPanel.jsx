import React from "react";

const OutputPanel = ({ output }) => {
    return (
        <div className="output-panel" style={{
            backgroundColor: "#111827",
            color: "#e5e7eb",
            borderRadius: "12px",
            padding: "16px",
            minHeight: "320px",
            fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace"
        }}>
            <div style={{ marginBottom: "12px" }}>
                <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Output</h2>
            </div>
            <pre style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                margin: 0,
                fontSize: "0.95rem"
            }}>
                {output || "Chưa có kết quả."}
            </pre>
        </div>
    );
};

export default OutputPanel;
