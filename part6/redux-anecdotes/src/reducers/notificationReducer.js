const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "VOTE_ALERT":
      const content_vote = action.data.content;
      const alertText_vote = `You voted for "${content_vote}"`;
      return alertText_vote;
    case "NEW_ALERT":
      const content_new = action.data.content;
      const alertText_new = `You added the anecdote: "${content_new}"`;
      return alertText_new;
    case "RESET_ALERT":
      return "";
    default:
      return state;
  }
};

export const voteNotification = (content) => {
  return {
    type: "VOTE_ALERT",
    data: {
      content
    }
  };
};

export const creationNotification = (content) => {
  return {
    type: "NEW_ALERT",
    data: {
      content
    }
  };
};

export const resetNotification = () => {
  return { type: "RESET_ALERT" };
};

export default notificationReducer;
