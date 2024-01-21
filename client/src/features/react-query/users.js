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

const logIn = async (userData) => {
  console.log("userData", userData);
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

  console.log(response);
  return response.json();
};

const getAll = async () => {
  console.log("getAll");
  const response = await fetch("http://localhost:3001/api/user/getUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  console.log(response);
  return response;
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

export const useLoginUser = (userData) => {
  const queryClient = useQueryClient();
  const loginUser = useQuery("login", () => logIn(userData), {
    // retry: false,
    // refetchOnWindowFocus: false,
    // refetchOnmount: false,
    // refetchOnReconnect: false,
    // enabled: false,
    onSuccess: () => {
      queryClient.invalidateQueries("login");
      toast.success("Successfully logged in");
    },
    onError: () => {
      toast.error("Log in failed!!");
    },
  });

  return loginUser;
};

export const useAllUsers = () => {
  const queryClient = useQueryClient();

  const allUser = useQuery("getAll", getAll, {
    refetchOnWindowFocus: true,
    refetchOnmount: true,
    refetchOnReconnect: true,
    enabled: true,
    onSuccess: () => {
      // queryClient.invalidateQueries("user");
    },
  });
  console.log("aU", allUser);
  return [allUser];
};
