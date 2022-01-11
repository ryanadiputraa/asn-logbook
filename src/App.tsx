import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "./lib/material-ui/theme";
import { Typography } from "@mui/material";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Typography>LogBook</Typography>
    </ThemeProvider>
  );
};
