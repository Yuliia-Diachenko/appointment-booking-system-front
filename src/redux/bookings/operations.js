import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Встановлення базового URL для axios
axios.defaults.baseURL = 'https://appointment-booking-system-mjfs.onrender.com';

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return rejectWithValue(error.response.data);
    }
  }
);