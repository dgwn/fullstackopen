import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 0,
      number: '555-5555'
    },
    { name: 'Dan Abramov',
      id: 1,
      number: '123-4567'}
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: (persons.length),
      number: newNumber
    }
    if (checkNames() === true) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
    else {window.alert(`"${nameObject.name}" is already in the phonebook`)}

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const displayNames = () => {
    if (newSearch === "") {
       return persons.map( person => <li key={person.id}>{person.name}: {person.number}</li>)
    }
    for (let i =0; i < persons.length; i++) {
      const included = persons[i].name.toLowerCase().includes(newSearch)
      if (persons[i].name.toLowerCase().includes(newSearch) === true && included ) {
        return persons
                  .filter( (person) => person.name.toLowerCase().includes(newSearch) )
                  .map( person => <li key={person.id}>{person.name}: {person.number}</li> )
      }
    }
    return <li>No such name in the phoneboook!</li>
  }

  const checkNames = () => {
    for (let i =0; i < persons.length; i++) {
      if (newName.toLowerCase() === persons[i].name.toLowerCase()) {
        return false
      }
    }
    return true
  }



  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          Search: <input value={newSearch} onChange={handleSearch}/>
        </div>
      </form>
      <h2>Add an entry</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        <div/>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {displayNames()}
        </ul>
    </div>
  )
}

export default App
