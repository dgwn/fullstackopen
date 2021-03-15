const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      const token = action.data;
      return token;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const setUser = (data) => {
  return async (dispatch) => {
    await dispatch({
      type: "LOGIN",
      data
    });
  };
};

export const resetUser = () => {
  return { type: "LOGOUT" };
};

export default loginReducer;
