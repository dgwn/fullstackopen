import React, { useState, useEffect } from 'react'
import nameService from './services/names'
import Form from './components/Form'
import Persons from './components/Persons'
import Search from './components/Search'


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

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (checkNames() === true) {
      nameService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
        })
    }
    else {window.alert(`"${nameObject.name}" is already in the phonebook`)}
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
    return <li>No such name in the phonebook</li>
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
      <Search
        newSearch={newSearch}
        setNewSearch={setNewSearch}
      />
      <h2>Add an entry</h2>
      <Form
        newName={newName}
        setNewName={setNewName}
        addName={addName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons displayNames={displayNames}/>
    </div>
  )
}

export default App
