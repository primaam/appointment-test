import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./util/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
