import React from 'react';

const Search = ( {newSearch, setNewSearch, runFilter, handleSearch} ) => {



  return(
    <div className="search">
      <form>
        <div>Search: <input value={newSearch} onChange={handleSearch}/></div>
      </form>
    </div>
  )
}

export default Search
