import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { creationNotification } from "../reducers/notificationReducer";
import { resetNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    console.log("create");
    const content = event.target.anecdoteContent.value;
    event.target.anecdoteContent.value = "";
    dispatch(creationNotification(content));
    dispatch(createAnecdote(content));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
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

export default AnecdoteForm;
