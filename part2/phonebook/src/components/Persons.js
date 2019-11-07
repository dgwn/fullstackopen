import React from 'react'

const Persons = ( {displayNames} ) => {
  return (
    <ul>
      {displayNames()}
    </ul>
  )
}

export default Persons
