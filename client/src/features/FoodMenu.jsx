import React from "react";
import FoodMenuCard from "../components/food-menu/Card";

function FoodMenu() {
  return (
    <div>
      <FoodMenuCard
        title="Delicious Pizza"
        description="A mouthwatering pizza topped with fresh ingredients."
        imageSrc="/path/to/pizza.jpg" 
      />
    </div>
  );
}

export default FoodMenu;
