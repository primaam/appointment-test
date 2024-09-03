import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette:{
        primary: {
            main: "#DCD7C9",
            light: "#2C3639",
            dark: "#A27B5C",
        },
        secondary:{
            main: "#6279B8",
            light: "#6B9AC4"
        },
        text:{
            primary: "#2C3639",
            secondary: "#DCD7C9",
        },
    },
    breakpoints:{
        values:{
            xs: 480,
            sm: 720,
            md: 900,
            lg: 1200,
            xl: 1440,
        }
    }
})

export {theme}