import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
function AlbumContent() {
  const { userId, albumId } = useParams();

  const [album, setalbum] = useState(null);
  const [photos, setphotos] = useState(null);

  useEffect(async () => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}&id=${albumId}`
    );
    const data = await resp.json();
    // console.log(data);
    setalbum(data);
  }, []);
  //   console.log(album);

  useEffect(async () => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );
    const data = await resp.json();
    setphotos(data);
    // console.log(data);
  }, []);

  console.log(album);
  return (
    <>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={album && album[0].title} variant="h2" />
        </ListItem>
      </List>
      <Divider />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {photos &&
          photos.map((photo, index) => (
            <Card sx={{ width: 350, marginTop: "12px" }} key={index}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={photo.thumbnailUrl}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {photo.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
}

export default AlbumContent;
