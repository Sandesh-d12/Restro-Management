import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import * as React from "react";
import { getFirstLetter } from "../utils";
import EditProductModal from "./EditProductModal";
import { CustomButton } from "../features/users";
import DeleteModal from "./DeleteModal";
import { removeProduct } from "../features/react-query/products";

export default function Products({
  Id,
  title,
  price,
  quantity,
  selected,
  orderQuantity,
  onSelect,
  onQuantityChange,
  selectionEnabled,
}) {
  const [open, setOpen] = React.useState(false);
  const [openId, setOpenId] = React.useState(null);

  console.log(Id);
  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleDeleteOpen = (id) => {
    setOpenId(id);
  };

  const handleCloseDelete = () => {
    setOpenId(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    if (selectionEnabled) {
      onSelect(Id);
    }
  };

  const handleQuantityChange = (change) => {
    onQuantityChange(Id, orderQuantity + change);
  };

  const handleDelete = () => {
    removeProduct(Id);
    setOpenId(null);
    alert("product removed successfully");
  };

  return (
    <Card
      sx={{
        minWidth: "200px",
      }}
    >
        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems:'center'
            }}
          >
      <FormControlLabel
        control={
        
            <Checkbox
              checked={selected}
              onChange={handleCheckboxChange}
              disabled={!selectionEnabled}
            />
 
        }
        style={{ margin: "0px !important", width: "100%" }}
        label=""
      />
      <DeleteModal
        description={"Are you sure you want to delete product?"}
        id={Id}
        handleOpen={() => handleDeleteOpen(Id)}
        handleClose={handleCloseDelete}
        open={Id == openId}
        handleDelete={handleDelete}
      />
               </div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {getFirstLetter(title)}
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={title}
        price={`price:${price}`}
      />
      <Button onClick={(e) => handleOpen(e)}>
        <CardMedia
          component="img"
          height="104"
          image="https://source.unsplash.com/random/200x200?sig=3"
          alt="Paella dish"
        />
      </Button>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Available Quantity: {quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
        {selectionEnabled && (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Button
              variant="outlined"
              onClick={() => handleQuantityChange(-1)}
              disabled={orderQuantity <= 1}
            >
              -
            </Button>
            <TextField
              value={orderQuantity}
              inputProps={{ readOnly: true }}
              style={{ width: "40px", textAlign: "center", margin: "0 10px" }}
            />
            <Button variant="outlined" onClick={() => handleQuantityChange(1)}>
              +
            </Button>
          </div>
        )}
        {/* <OrderDrawer productId={Id} /> */}
      </CardContent>
      <EditProductModal
        title={title}
        id={Id}
        open={open}
        handleClose={handleClose}
        price={price}
        quantity={quantity}
      />
    </Card>
  );
}
