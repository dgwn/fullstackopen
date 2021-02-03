import React from "react";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdoteContent.value;
    event.target.anecdoteContent.value = "";
    props.setNotification(`You added the anecdote: "${content}"`, 5);
    props.createAnecdote(content);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdoteContent" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
