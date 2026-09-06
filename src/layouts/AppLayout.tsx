import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import { dotGridSx } from "../theme/texture";

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Selecting a page (or any other nav action) should close the overlay drawer.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <Box
        component="main"
        sx={(theme) => ({
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
          ...dotGridSx(theme),
        })}
      >
        <IconButton
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 1,
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
