import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk("user/createUser", async (data) => {
  const response = await axios
    .post(
      "http://localhost:3001/createUser",
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userType: data.userType,
      },
      new URLSearchParams(values).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error while signing up:", error);
    });
  return response.data;
});

//  axios.post("https://reqres.in/api/users", userData).then((response) => {
//       console.log(response.status, response.data);
//     });

export const userSlice = createSlice({
  name: "users",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log(action);
    });
  },
});

// Action creators are generated for each case reducer function
export const { createUser } = userSlice.actions;

export default userSlice.reducer;
