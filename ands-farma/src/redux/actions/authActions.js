export const login = () => {
  return {
    type: 'LOGIN',
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const setLoggedIn = (isLoggedIn) => {
  return {
    type: 'SET_LOGGED_IN',
    payload: isLoggedIn,
  };
};