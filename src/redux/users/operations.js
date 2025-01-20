import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://appointment-booking-system-mjfs.onrender.com";

export const getUsers = createAsyncThunk("/users/getUsers",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/users');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getUserById = createAsyncThunk("/users/getUser",

    async (_id, thunkAPI) => {      
          
        try {
            const response = await axios.get(`/users/${_id}`);    
            return response.data;  
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
});

export const addUser = createAsyncThunk(
    'users/addUser',
    async (newUser, thunkAPI) => {      
        
        try {
            const response = await axios.post('/users', newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }}
            );
            return response.data;
        } catch (error) {
            console.error("Error response from server:", error.response ? error.response.data : error.message);
            return thunkAPI.rejectWithValue(error.message);
          }
});

export const deleteUser = createAsyncThunk(
        'users/deleteUser',
    async (_id, thunkAPI) => {      
            
        try {
                const response = await axios.delete(`/users/${_id}`);
                return response.data;  
        } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            
            }
});

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({_id, name, email, userType, bookings}, thunkAPI) => {
        try {
            const response = await axios.patch(`/users/${_id}`, {name, email, userType, bookings});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
            
        }
});

export const toggleCompleted = createAsyncThunk(
    "users/toggleCompleted",
    async (user, thunkAPI) => {
      try {
        const response = await axios.put(`/users/${user._id}`, {
          completed: !user.completed,
        });
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const fetchVisiableUsers = createAsyncThunk(
    'users/fetchVisiableUsers',
    async (page, perPage, thunkAPI) => {
        try {   
            const response = await axios.get(`/users?page=${page}&perPage=${perPage}`);
            console.log("API response data:", response.data.data);
            return response.data.data;

          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
        }  
);