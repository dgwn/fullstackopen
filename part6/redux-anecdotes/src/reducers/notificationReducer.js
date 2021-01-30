const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_ALERT":
      const content = action.data.content;
      return content;

    case "RESET_ALERT":
      return "";
    default:
      return state;
  }
};

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    await dispatch({
      type: "SET_ALERT",
      data: {
        content
      }
    });

    const timeout = (await seconds) * 1000;
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeout);
  };
};

export const resetNotification = () => {
  return { type: "RESET_ALERT" };
};

export default notificationReducer;
