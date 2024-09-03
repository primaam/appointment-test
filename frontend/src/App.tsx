import React from "react";
import { Login } from "./pages";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./util/theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Login />
        </ThemeProvider>
    );
}

export default App;
