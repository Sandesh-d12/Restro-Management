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
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    return response.json();
  };
  
  export const usePlaceOrder = () => {
    const queryClient = useQueryClient();
    const addProduct = useMutation(placeOrder, {
      onSuccess: (data) => {
        toast.success(data.message)
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
  