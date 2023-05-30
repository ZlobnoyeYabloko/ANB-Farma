export const registerUser = (userData) => {
    return (dispatch) => {
      // You can perform any necessary validation or preprocessing here before making the API call
      
      // Make the API call to register the user
      axios.post('/api/register', userData)
        .then((response) => {
          // Dispatch a success action if the registration is successful
          dispatch(registerUserSuccess(response.data));
        })
        .catch((error) => {
          // Dispatch an error action if the registration fails
          dispatch(registerUserFailure(error.message));
        });
    };
  };
  
  const registerUserSuccess = (data) => {
    return {
      type: 'REGISTER_USER_SUCCESS',
      payload: data
    };
  };
  
  const registerUserFailure = (error) => {
    return {
      type: 'REGISTER_USER_FAILURE',
      payload: error
    };
  };