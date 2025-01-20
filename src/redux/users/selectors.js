export const selectUsers = (state) => state.users.data || [];
export const selectUser = (state) => state.users.data.userId;
export const selectError = (state) => state.users.error;
export const selectLoading = (state) => state.users.loading;
export const selectVisiableUsers = (state) => state.users.data;