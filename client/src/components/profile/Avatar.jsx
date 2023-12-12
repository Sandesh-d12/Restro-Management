import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../features/users/AuthContext";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const ctx = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    axios
      .get("http://localhost:3001/logout", {
        headers: {
          "content-type": "application/json",
          Authorization: user.token,
        },
      })
      .then((result) => {
        console.log("Logout successful:", result.data);
        navigate("/");
        localStorage.clear();
        window.location.reload();
        // ctx.onLogOut();
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    setAnchorEl(null);
  };
  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      {user && (
        <div style={{ width: "18%", marginRight: "10px" }}>
          <Avatar src="/owner.jpg" onClick={handleAvatarClick} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <div
              style={{
                padding: "10px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {user.user.email}
            </div>
            <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}