import React from "react";

const Persons = ({ displayNames }) => {
  return <ul className="list-group">{displayNames()}</ul>;
};

export default Persons;
