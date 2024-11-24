import { createContext, useState } from "react";
import {
  createTheme,
  Paper,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

export const ThemeContext = createContext();

export function ThemeProviderContext({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(prefersDarkMode);

  const appTheme = createTheme({
    palette: { mode: theme ? "dark" : "light" },
  });

  const handleChange = () => setTheme(!theme);

  return (
    <ThemeContext.Provider value={{ handleChange, theme }}>
      <ThemeProvider theme={appTheme}>
        <Paper elevation={0} sx={{ height: "100vh" }} square>
          {children}
        </Paper>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
