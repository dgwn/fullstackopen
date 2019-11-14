import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Search from './components/search'
import Countries from './components/countries'

function App() {

  const [ countries, setCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  const [ filteredList, setFilteredList] = useState([])

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    runFilter()
  }

  const handleClick = (event) => {
    setNewSearch(event.target.id.toLowerCase())
  }


  useEffect(() => {
    runFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSearch])

  const runFilter = () => {
    const currentCountries = []
    if (newSearch.length > 0) {
      for (let i = 0; i < countries.length; i++) {
        const included = countries[i].name.toLowerCase().includes(newSearch)
        if (countries[i].name.toLowerCase().includes(newSearch) === true && included ) {
          currentCountries.push(countries[i])
        }
      }
      setFilteredList( currentCountries )
    }
  }


  return (
    <div className="App">
      <h3>Find Countries:</h3>
      <Search
        newSearch={newSearch}
        setNewSearch={setNewSearch}
        handleSearch={handleSearch}
        runFilter={runFilter}
        filteredList={filteredList}
        />
      <Countries
        filteredList={filteredList}
        runFilter={runFilter}
        handleClick={handleClick}
        />

    </div>
  );
}

export default App;
