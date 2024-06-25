import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const addTable = async (tableData) => {
  const response = await fetch("http://localhost:3001/api/table/addTable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tableData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const getAll = async () => {
    const response = await fetch("http://localhost:3001/api/table/getAll", {
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

  export const useAllTable = () => {
    const allTable = useQuery("getAll", () => getAll(), {});
  
    return allTable;
  };


  export const removeTable = async (tableNumber) => {

    const response = await fetch(
      `http://localhost:3001/api/table/removeTable`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableNumber }), 
      }
    );
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    return response.json();
  };

  const updateTable = async (tableData) => {
 
    const response = await fetch(
      `http://localhost:3001/api/table/updateTable`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    return response;
  };
  
  export const useUpdateTable = () => {
    const queryClient = useQueryClient();
    const updatedTable = useMutation(updateTable, {
    
    });
  
    return updatedTable;
  };
