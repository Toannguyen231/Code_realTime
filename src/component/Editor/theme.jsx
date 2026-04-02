import { extendTheme } from "@monaco-editor/react";

const theme = extendTheme({
    config: {
        initiaColorMode: "dark",
        useSystemColorMode: false,
    },
});

export default theme;

