import { createContext, ReactNode, useState } from "react";
import {
  createTheme,
  Paper,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from "@mui/material";

export interface ThemeContextType {
  theme: boolean;
  handleChange: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<boolean>(prefersDarkMode);

  const appTheme = createTheme({
    palette: { mode: theme ? "dark" : "light" },
  });

  const handleChange = () => setTheme(!theme);

  return (
    <ThemeContext.Provider value={{ handleChange, theme }}>
      <MuiThemeProvider theme={appTheme}>
        <Paper elevation={0} sx={{ height: "100vh" }} square>
          {children}
        </Paper>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
