import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const placeOrder = async (data) => {
    const response = await fetch(
      "http://localhost:3001/api/order/addOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      }
    );
  if(response.ok){
    alert('order placed successfully')
  }
    if (!response.ok) {
      const errorMessage = await response.json()
      alert(errorMessage)
    }
  
    return response.json();
  };
  
  export const usePlaceOrder = () => {
    const queryClient = useQueryClient();
    const addProduct = useMutation(placeOrder, {
      onSuccess: (data) => {
    
      },
    });
  
    return addProduct;
  };


  const getAll = async () => {
    const response = await fetch("http://localhost:3001/api/order/allOrder", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  
  export const useAllOrder = () => {
    const allOrder = useQuery("getAll", () => getAll(), {});

    return allOrder.data;
  };
  

  export const removeOrder = async (id) => {

    const response = await fetch(
      `http://localhost:3001/api/order/removeOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), 
      }
    );
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    return response.json();
  };

  const updateOrder = async (orderData) => {
 
    const response = await fetch(
      `http://localhost:3001/api/order/updateOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
     
    );
    if(response.ok){
      alert('order updated successfully')
    }
  
    if (!response.ok) {
      const errorMessage = await response.json()
      alert(errorMessage)
    }
 
    return response;
  };
  
  export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    const updatedOrder = useMutation(updateOrder, {
    
    });
  
    return updatedOrder;
  };

  export const getOrder = async (id) => {
  
    const response = await fetch(`http://localhost:3001/api/order/getOrder/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };
  
