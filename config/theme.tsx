import { createTheme } from "@mui/material/styles";
import { red, green, yellow } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#42A5f6",
    },
    secondary: {
      main: "#000000",
    },
    success: {
      main: green.A400,
    },
    warning: {
      main: yellow.A400,
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    // Name of the component
  },
});

export default theme;
