
import { useQuery, useMutation, useQueryClient } from "react-query";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";



const signUp= async (userData) => {
  const response = await fetch("http://localhost:3001/createUser", {
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

const logIn= async (userData) => {
  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  console.log(response)
  return response.json();
};


export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
const navigate = useNavigate()
  const createPostMutation = useMutation(signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success('user created successfully')
      navigate("/");
    },
  });

  return createPostMutation;
};

export const useLoginUser = (userData) => {
  const queryClient = useQueryClient();

  const loginUser = useQuery('login', () => logIn(userData), {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success('Successfully logged in');

    },
  });

  return loginUser;
};