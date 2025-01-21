import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './users/slice.js';
import { filtersReducer } from './filters/slice.js';

const rootReducer = {
    users: usersReducer,
    filters: filtersReducer
};

export const store = configureStore({
    reducer: rootReducer,
});
