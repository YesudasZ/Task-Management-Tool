import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../common/Logo";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "../../services/firebase/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  console.log("userdata",user)

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Logo />

        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {user.photoURL ? (
                <Avatar src={user.photoURL} alt={user.displayName || ""} />
              ) : (
                <Avatar>{user.displayName?.[0] || "U"}</Avatar>
              )}
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {user.displayName}
              </Typography>
            </Box>
            <Box>
              <IconButton
                onClick={handleLogout}
                color="primary"
                sx={{ display: { xs: "flex", sm: "none" } }}
              >
                <LogOut />
              </IconButton>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="primary"
                startIcon={<LogOut />}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
