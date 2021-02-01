import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = () => {
    if (props.filter === "") {
      return props.anecdotes;
    } else {
      return props.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
      );
    }
  };

  // const dispatch = useDispatch();

  const vote = (id, content) => {
    console.log("vote", id);
    const votes = anecdotes().filter((anecdote) => {
      return anecdote.id === id;
    })[0].votes;

    props.setNotification(`You voted for '${content}'`, 5);
    props.voteAnecdote(id, votes);
  };

  return (
    <div>
      {anecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
};

const ConnectedList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedList;
