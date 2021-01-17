import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const filterAnecdotes = (event) => {
    const query = event.target.value;
    dispatch(setFilter(query));
  };
  return (
    <div>
      <h3>Filter</h3>
      <input name="query" onChange={filterAnecdotes} />
    </div>
  );
};

export default Filter;
