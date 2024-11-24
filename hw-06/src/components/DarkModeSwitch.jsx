import { useContext } from "react";
import { Box, Switch } from "@mui/material";
import { ThemeContext } from "../ThemeContext";

export default function DarkModeSwitch() {
  const { handleChange, theme } = useContext(ThemeContext);

  return (
    <Box sx={{ textAlign: "center", fontSize: "13px" }}>
      Theme switch
      <Switch
        checked={theme}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
}
