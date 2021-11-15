import React from "react";

const Search = ({ newSearch, setNewSearch }) => {
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <form className="mb-3">
      <div>
        Search:{" "}
        <input
          value={newSearch}
          onChange={handleSearch}
          className="form-control w-50"
        />
      </div>
    </form>
  );
};

export default Search;
