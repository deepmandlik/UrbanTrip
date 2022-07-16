import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function PopupCard({
  title,
  info,
  photo,
}: {
  title: string;
  info: string;
  photo: string;
}) {
  return (
    <Card sx={{ maxWidth: 250, boxShadow: "none" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="125"
          image={
            photo ??
            "https://maps.gstatic.com/tactile/reveal/no_street_view_2x_080615.png"
          }
          alt="green iguana"
        />
        <CardContent sx={{ padding: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
