import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const signUp = async (userData) => {
  const response = await fetch("http://localhost:3001/api/user/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage?.data)
  }

  return response.json();
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
const [error, setError] = useState('')
  const createPostMutation = useMutation(signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      alert('user added successfully')
      // toast.success("user created successfully");
    },
    onError: (err) =>{
      alert(err)
      console.log('err',err)
setError(err)
    }
  });
console.log('error',error)
  return {...createPostMutation, error}
;};

const logIn = async (userData) => {
  const response = await fetch("http://localhost:3001/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useLoginUser = (userData) => {

  const loginUser = useQuery("login", () => logIn(userData), {
    retry:false,
    onSuccess: () => {
      toast.success("Successfully logged in");
    },
    onError: () => {
      toast.error("Log in failed!!");
    },
  });

  return loginUser
};

const getAll = async () => {
  const response = await fetch("http://localhost:3001/api/user/getUsers", {
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

export const useAllUsers = () => {
  return useQuery('getAll', getAll, {
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
  });
};


const updateUser = async (userData) => {
console.log('uDD',userData)
  const response = await fetch(`http://localhost:3001/api/user/updateUser/${userData?.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData.values),
  });
  if (!response.ok) {
    const errorMessage = await response.json()
    throw new Error(errorMessage)
  }
  return response.json();
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createPostMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
  alert('user updated successfully')
  
    },
    onError:(err)=>{
      alert(err)
    },
    onLoading:()=>{

    }
  });
  // localStorage.setItem('user', JSON.stringify(createPostMutation?.data));

  return createPostMutation;
};

// export const removeUser = async (email) => {
//   console.log(email)
//   const response = await fetch(
//     `http://localhost:3001/api/user/removeUser`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body:email
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   return response.json();
// };

export const removeUser = async (email) => {

  const response = await fetch(
    `http://localhost:3001/api/user/removeUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), 
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};