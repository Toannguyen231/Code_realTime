import CodeEditor from "../Editor/CodeEditor";
import OutputPanel from "../Output/OutputPanel";
import { useState } from "react";
import ButtonRunCode from "../Output/ButtonRunCode";
import { LiaEarlybirds } from "react-icons/lia";
import "./RoomHeader.scss";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../Editor/theme";
import { MonacoEditor } from "@monaco-editor/react";
import { CodeEditor } from "@monaco-editor/react";
function RoomPage() {
    const [code, setCode] = useState("// viết C++ ở đây");
    const [output, setOutput] = useState("");

    return (
        <div className="app-shell">
            <header className="room-header">
                <h1 className="d-flex align-items   -center gap-2"><LiaEarlybirds className="icon" size={40} /> Room Code Editor</h1>
            </header>

            <ChakraProvider theme={theme}>
                <div className="room-body">
                    <div className="editor-column">
                        <CodeEditor code={code} setCode={setCode} />
                    </div>

                    <div className="output-column">
                        <OutputPanel output={output} setOutput={setOutput} code={code} />
                        <div style={{ marginTop: '16px' }}>
                            <ButtonRunCode onClick={() => setOutput("Đang chạy code...")} />
                        </div>
                    </div>
                </div>
            </ChakraProvider>
        </div>
    );
}

export default RoomPage;