import React from 'react';
 import styles from './styles/dashboard.module.css'
import Products from '../components/products';
import PlaceOrderModal from '../components/orderModal';

const Product = [
  {
    id: 1,
    title: "Pizza",
    icon: "",
    onClick: () => {
     
    },
  },
  {
    id: 2,
    title: "Momo",
    icon: "",
    onClick: () => {
 
    },
  },
  {
    id: 3,
    title: "Chowmin",
    icon: "",
    onClick: () => {
      
    },
  },
  {
    id: 4,
    title: "Samosa",
    icon: "",
    onClick: () => {
     
    },
  },
  {
    id: 5,
    title: "Fries",
    icon: "",
    onClick: () => {
  
    },
  },
  {
    id: 6,
    title: "Thukpa",
    icon: "",
    onClick: () => {
   
    },
  },
];


 const Orders = () => {
  
  return(
   <div>
   
     <h1>Available Items</h1>
     <div className={styles.card}>
     <Products data={Product}/>
     </div>
   </div>
  )
  }
 
 export default Orders;