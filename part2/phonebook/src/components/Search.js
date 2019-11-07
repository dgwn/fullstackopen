import React from 'react'

const Search = ( {newSearch, setNewSearch} ) => {
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <form>
      <div>
        Search: <input value={newSearch} onChange={handleSearch}/>
      </div>
    </form>
  )
}

export default Search
