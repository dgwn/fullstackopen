import React from "react";

const Form = ({ newName, setNewName, newNumber, setNewNumber, addName }) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form className="mb-3 w-50">
      <div>
        <label className="form-label">Name:</label>
        <input
          value={newName}
          onChange={handleNameChange}
          className="form-control"
        />
      </div>
      <div>
        <label className="form-label">Number:</label>
        <input
          value={newNumber}
          onChange={handleNumberChange}
          className="form-control"
        />
        <div />
        <button type="submit" class="btn btn-primary mt-2" onClick={addName}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
