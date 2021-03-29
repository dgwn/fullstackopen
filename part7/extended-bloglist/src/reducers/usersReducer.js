import axios from "axios";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data.data;
    default:
      return state;
  }
};

export const initUsers = (users) => {
  return async (dispatch) => {
    const users = await axios.get("api/users");
    dispatch({
      type: "INIT_USERS",
      data: users
    });
  };
};

export default userReducer;
