import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { NavigateOptions, To } from "react-router-dom";

interface Props {
  isAuth: boolean;
  handleLogout: () => void;
  navigate: (to: To, options?: NavigateOptions | undefined) => void;
}

export const MenuBar: React.FC<Props> = ({
  isAuth,
  handleLogout,
  navigate,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            color="secondary"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            ASN LogBook
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="secondary"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {isAuth
                ? [
                    <MenuItem key="profile" onClick={handleClose}>
                      Profil
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                      Keluar
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        window.localStorage.removeItem("asn-logbook-profile");
                        window.location.reload();
                      }}
                    >
                      Ubah Data ASN
                    </MenuItem>,
                    <MenuItem key="login" onClick={() => navigate("/login")}>
                      Masuk
                    </MenuItem>,
                    <MenuItem
                      key="register"
                      onClick={() => navigate("/register")}
                    >
                      Daftar
                    </MenuItem>,
                  ]}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
