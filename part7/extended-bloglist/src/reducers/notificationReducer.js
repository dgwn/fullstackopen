let notificationTimeout;

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      const content = action.data.content;
      return content;
    case "RESET_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const setNotification = (content) => {
  return async (dispatch) => {
    await dispatch({
      type: "SET_NOTIFICATION",
      data: { content }
    });

    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      dispatch(resetNotification());
    }, 7000);
  };
};

export const resetNotification = () => {
  return { type: "RESET_NOTIFICATION" };
};

export default notificationReducer;
