
export const getVisibleUsers = (users, statusFilter) => {
    switch (statusFilter) {
      case 'client':
        return users.filter((user) => !user.completed);
      case 'busness':
        return users.filter((user) => user.completed);
      default:
        return users;
    }
};