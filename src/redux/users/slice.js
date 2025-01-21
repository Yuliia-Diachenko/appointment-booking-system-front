import { createSlice } from "@reduxjs/toolkit";
import { getUsers, getUserById, addUser, deleteUser, updateUser, fetchVisiableUsers } from "./operations.js";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        loading: false,
        error: null,
        pagination: {
            page: "1",
            perPage:"2",
            totalItems: "3" 
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getUsers.pending, state => {
            state.error = false;
            state.loading = true;
          })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
          })
        .addCase(getUsers.rejected, state => {
            state.loading = false;
            state.error = true;
          })
          .addCase(getUserById.pending, state => {
            state.error = false;
            state.loading = true;
          })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
          })
        .addCase(getUserById.rejected, state => {
            state.loading = false;
            state.error = true;
          })
        .addCase(addUser.pending, state => {
            state.error = false;
            state.loading = true;
        })
        .addCase(addUser.fulfilled, (state, action) =>{
            state.data.push(action.payload);
            state.loading = false;
        })
        .addCase(addUser.rejected, state => {
            state.loading = false;
            state.error = true;
        })
        .addCase(deleteUser.pending, state => {
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.data = state.users.filter(user => user.id !== action.payload.id);
           state.loading = false;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateUser.pending, state => {
            state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          console.log(action.payload);
          if (Array.isArray(state.data)) {
              state.data.push(action.payload);
          } else {
              state.data = [action.payload];
          }
          state.error = null;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchVisiableUsers.pending, state => {
            state.error = false;
            state.loading = true;
          })
        .addCase(fetchVisiableUsers.fulfilled, (state, action) => {
          console.log('Action payload:', action.payload);
            state.data = action.payload;
            state.loading = false;
          })
        .addCase(fetchVisiableUsers.rejected, state => {
            state.loading = false;
            state.error = true;
          })
    }, 
}
);

export default usersSlice.reducer;

export const usersReducer = usersSlice.reducer;