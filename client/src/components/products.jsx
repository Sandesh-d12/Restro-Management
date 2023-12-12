import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import * as React from "react";
import PlaceOrderModal from "./orderModal";

export default function Products({ title, subHeader, description }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        minWidth: "200px",
        minWidth: "200px",
        padding: "15px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={title}
        subheader={subHeader}
      />
      <Button onClick={handleOpen}>
        <CardMedia
          component="img"
          height="104"
          image="https://source.unsplash.com/random/200x200?sig=3"
          alt="Paella dish"
        />
      </Button>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <PlaceOrderModal open={open} handleClose={handleClose} />
    </Card>
  );
}
