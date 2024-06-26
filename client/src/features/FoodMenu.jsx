import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useGetProducts } from "./react-query/products";
import { useNavigate } from "react-router-dom";
import SearchProduct from "../components/SearchProduct";
import ProductDrawer from '../components/food-menu/Drawer'


const Menu = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      category: "beverage",
      url:"beverage",
      description: "enjoy the bev",
      image: "",
    },
    {
      id: 2,
      category: "starter",
      url:'starter',
      description: "enjoy the bev",
      image: "",
    },
    {
      id: 3,
      category: "main course",
      url:"main_course",
      description: "enjoy the bev",
      image: "",
    },
    {
      id: 4,
      category: "desserts",
      url:'desserts',
      description: "enjoy the bev",
      image: "",
    },
    {
      id: 5,
      category: "chief special",
      url:'chef_special',
      description: "enjoy the bev",
      image: "",
    },
  ];

  const handleClick = (category) => {
    navigate(`/products/${category}`)
  }
  return data.map((item) => (
    <Card sx={{ maxWidth: 345, width:'100%' }}     onClick={() => handleClick(item.url)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
       image="https://source.unsplash.com/random/200x200?sig=3"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
};

function FoodMenu() {
  const { data, isLoading } = useGetProducts();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "42px",
        marginLeft: "21rem",
        padding:'20px'
      }}
    >
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span style={{fontSize:'32px', lineHeight:'normal', fontWeight:700}}>Menu Items</span>
        <div style={{marginRight:'4.5rem'}}>
      <ProductDrawer type={"product"} />
      </div>
      </div>
      {/* <SearchProduct /> */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems:'center',justifyContent:'start' }}>
        <Menu />
      </div>
    </div>
  );
}

export default FoodMenu;
