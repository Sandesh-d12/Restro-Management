import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const signUp = async (userData) => {
  const response = await fetch("http://localhost:3001/api/user/addUser", {
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

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createPostMutation = useMutation(signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success("user created successfully");
      navigate("/");
    },
  });

  return createPostMutation;
};

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
    onSuccess: () => {
      toast.success("Successfully logged in");
    },
    onError: () => {
      toast.error("Log in failed!!");
    },
  });

  return loginUser;
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
  const allUser = useQuery("getAll", () => getAll(), {});

  return allUser;
};
