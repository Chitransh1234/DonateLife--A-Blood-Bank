import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

// Login action
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);

        // Display success message
        toast.success(data.message);

        // Redirect to home page after successful login
        window.location.replace("/");

        return data;
      } else {
        // If not successful, show the error message
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Register action
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      website,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      });

      if (data?.success) {
        toast.success("User Registered Successfully");
        alert('User Registered Successfully');
        window.location.replace("/login");
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
// export const userRegister = createAsyncThunk(
//   "auth/register",
//   async (
//     {
//       name,
//       role,
//       email,
//       password,
//       phone,
//       organisationName,
//       address,
//       hospitalName,
//       website,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       // Make the API POST request for registration
//       const { data } = await API.post("/auth/register", {
//         name,
//         role,
//         email,
//         password,
//         phone,
//         organisationName,
//         address,
//         hospitalName,
//         website,
//       });

//       // Log data for debugging purposes
//       console.log("Register Response: ", data);

//       if (data?.success) {
//         // If registration is successful, show success toast
//         toast.success("User Registered Successfully");

//         // Redirect to login page
//         window.location.replace("/login");
//       } else {
//         // If registration failed, show error toast
//         toast.error(data.message || "Something went wrong");

//         // Return the error message to the rejectWithValue
//         return rejectWithValue(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       // Handle any errors that occur during the request
//       console.error("Error during registration: ", error);

//       // Check if there's a response message from the API
//       const errorMessage = error.response?.data?.message || error.message;

//       // Show error toast with the error message
//       toast.error(errorMessage);

//       // Return the error message to the rejectWithValue
//       return rejectWithValue(errorMessage);
//     }
//   }
// );
// Get current user action
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res.data) {
        return res.data;
      } else {
        return rejectWithValue("No data found for current user.");
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
