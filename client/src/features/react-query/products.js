import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const getProducts = async () => {
  const response = await fetch(
    "http://localhost:3001/api/product/allProducts",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useGetProducts = () => {
  const allProducts = useQuery("getProducts", () => getProducts(), {});

  return allProducts;
};

const updateProduct = async (productData) => {
  const ID = productData?.id;

  const response = await fetch(
    `http://localhost:3001/api/product/updateProduct/${ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData?.values),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const updatedProduct = useMutation(updateProduct, {
  
  });

  return updatedProduct;
};

const addNewProduct = async (data) => {
  const response = await fetch(
    "http://localhost:3001/api/product/addNewProduct",
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

export const useAddNewProduct = () => {
  const queryClient = useQueryClient();
  const updatedProduct = useMutation(addNewProduct, {
    onSuccess: () => {
      //   queryClient.invalidateQueries("updateProduct");

      toast.success("product added successfully");
        window.location.reload()
    },
  });

  return updatedProduct;
};