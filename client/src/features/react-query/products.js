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
  const addProduct = useMutation(addNewProduct, {
    onSuccess: (data) => {
      toast.success(data.message)
    },
  });

  return addProduct;
};

export const getProductsByCategory = async (category) => {
  const response = await fetch(
    "http://localhost:3001/api/product/getProductByCategory",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(category)
    }
  );
  if (!response.ok) {

    throw new Error("Network response was not ok");
  }

  return response.json();
};

const searchProducts = async (keyword) => {
  const response = await fetch(
    `http://localhost:3001/api/product/searchProduct/${keyword}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage);
  }

  return response.json();
};

export const useSearchProduct = (keyword) => {
  const { data, isLoading, isError, error } = useQuery(["searchProducts", keyword], () => searchProducts(keyword), {
    enabled: !!keyword, 
    refetchOnWindowFocus: false, 
    cacheTime: 600000,
    staleTime: 300000,
  });

  return { data, isLoading, isError, error };
};

export const removeProduct = async (id) => {

  const response = await fetch(
    `http://localhost:3001/api/product/removeProduct/${id}`,
    {
      method: "POST",
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