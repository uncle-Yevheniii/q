import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Link, DarkModeSwitch } from "../components";

export default function HomeLayout() {
  return (
    <Box
      component="section"
      sx={{
        p: 2,
        display: "flex",
        height: "100%",
      }}
    >
      <Box
        component="nav"
        sx={{
          width: "100px",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "35px",
        }}
      >
        <Link to="/heroes" children="Heroes" />
        <Link to="/about" children="About" />
        <DarkModeSwitch />
      </Box>

      <Outlet />
    </Box>
  );
}
