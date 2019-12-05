import React, { useState, useEffect } from 'react'
import nameService from './services/names'
import Form from './components/Form'
import Persons from './components/Persons'
import Search from './components/Search'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState(null)

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
          setMessageType('success')
          setErrorMessage(`${newName} was added to the phonebook.`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
            setMessageType(null)
          }, 2000)
        })
        .catch(error => {
          setMessageType('error')
          setErrorMessage(error.message)
          setTimeout(() => {
            setErrorMessage(null)
            setMessageType(null)
          }, 2000)
        })
      }
    else {
      const result = window.confirm(`"${nameObject.name}" is already in the phonebook. Replace the old number with a new one?`)
      if (result) {
        // find the person object with a name that matches the inputted one
        const selectedPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        // create a new object using the new number but old ID
        const newNameObject = {
          name: nameObject.name,
          number: newNumber,
          id: selectedPerson.id
        }
        nameService
          .update(newNameObject)
          .then(returnedName => {
            setPersons(persons.map(person => person.id !== newNameObject.id ? person: returnedName))
            setMessageType('success')
            setErrorMessage(`${newName} was updated.`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setErrorMessage(null)
              setMessageType(null)
            }, 2000)
          })
          .catch(error => {
            setErrorMessage(`${newName} was already removed from server.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
          })
      }
    }
  }

  const checkNames = () => {
    for (let i =0; i < persons.length; i++) {
      if (newName.toLowerCase() === persons[i].name.toLowerCase()) {
        return false
      }
    }
    return true
  }

  const deleteName = id => {
    const deleteObject = persons.find(n => n.id === id).id
    nameService
      .remove(deleteObject)
      .then(deleteObject => {
        setPersons(persons.filter(n => n.id !== id))
        setErrorMessage(`A name was deleted.`)
        setMessageType('success')
        setTimeout(() => {
          setErrorMessage(null)
          setMessageType(null)
        }, 2000)
      })
  }

  const displayNames = () => {
    if (newSearch === "") {
       return persons.map( person => <li key={person.id}>{person.name}: {person.number} <button onClick={ () => deleteName(person.id)}>Delete</button></li>)
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



  return (
    <div>
      <h1>Phonebook</h1>
      <Search
        newSearch={newSearch}
        setNewSearch={setNewSearch}
      />
      <h2>Add an entry</h2>
      <Notification message={errorMessage} messageType={messageType} />
      <Form
        checkNames={checkNames}
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
