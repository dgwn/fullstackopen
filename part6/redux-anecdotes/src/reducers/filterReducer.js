const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data.query;
    default:
      return state;
  }
};

export const setFilter = (query) => {
  return {
    type: "SET_FILTER",
    data: { query }
  };
};

export default filterReducer;
