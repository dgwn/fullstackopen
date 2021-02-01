// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
// ];

import anecdoteService from "../services/anecdotes";

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = [], action) => {
  //console.log("action", action);
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find((n) => n.id === id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);

    case "NEW":
      const newContent = action.data.content;
      const newAnecdote = {
        content: newContent,
        votes: 0,
        id: action.data.id
      };
      console.log([...state, newAnecdote]);

      return [...state, newAnecdote].sort((a, b) => b.votes - a.votes);

    case "INIT_ANECDOTES":
      return action.data;

    default:
      return state;
  }
};

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: "NEW",
      data: newAnecdote
    });
  };
};

export const voteAnecdote = (id, votes) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(id, votes);
    dispatch({
      type: "VOTE",
      data: updatedAnecdote
    });
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export default anecdoteReducer;
