import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 0,
      number: '555-5555'
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  const displayNames = () => persons.map( person => <li id={person.id}>{person.name}: {person.number}</li>)

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
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        <div/>
          <button type="submit" onClick={addName}>add</button>
        </div>
        {/* <div>debug: {}</div> */}
      </form>
      <h2>Numbers</h2>
        <ul>
          {displayNames()}
        </ul>
    </div>
  )
}

export default App
