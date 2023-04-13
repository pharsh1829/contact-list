import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: { main: "#2b7a78" },
  },
});

export default theme;
