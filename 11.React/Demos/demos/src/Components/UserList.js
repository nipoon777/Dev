import { useState, useEffect } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const handlePopoverOpen = (event, userObj) => {
    setAnchorEl(event.currentTarget);
    setUsername(userObj.user.username);
    setEmail(userObj.user.email);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setUsername(null);
    setEmail(null);
  };

  const open = Boolean(anchorEl);

  useEffect(async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();

    console.log(data);
    setUsers(data);
  }, []);

  return (
    <>
      <div
        style={{
          topMargin: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {users &&
          users.map((user) => (
            <div key={user.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  minWidth: 350,
                  minHeight: 200,
                  marginTop: "20px",
                }}
                key={user.id}
              >
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 150,
                    backgroundColor: "#c7ecee",
                  }}
                >
                  <PersonIcon sx={{ fontSize: "50px" }} />
                </CardMedia>
                <CardContent
                  sx={{
                    backgroundColor: "#535c68",
                  }}
                >
                  <Link
                    to={`/userprofile/${user.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={(e) => handlePopoverOpen(e, { user })}
                      onMouseLeave={handlePopoverClose}
                      sx={{ color: "white" }}
                    >
                      {user.name}
                    </Typography>
                  </Link>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: "none",
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Typography sx={{ p: 1 }}>Username : {username}</Typography>
                    <Typography sx={{ p: 1 }}>Email : {email}</Typography>
                  </Popover>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
}

export default UserList;
