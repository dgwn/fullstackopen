import React from 'react'

const Form = ( {newName, setNewName, newNumber, setNewNumber, addName}) => {

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
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
  )
}

export default Form
