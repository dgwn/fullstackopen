let notificationTimeout;

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

    const timeoutTime = (await seconds) * 1000;
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      dispatch(resetNotification());
    }, timeoutTime);
  };
};

export const resetNotification = () => {
  return { type: "RESET_ALERT" };
};

export default notificationReducer;
