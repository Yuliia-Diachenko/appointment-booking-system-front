import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/slice.js';
import { filtersReducer } from './filters/slice.js';
import bookingsReducer from './bookings/slice';

const rootReducer = {
    users: usersReducer,
    bookings: bookingsReducer,
    filters: filtersReducer
};

export const store = configureStore({
    reducer: rootReducer,
});
