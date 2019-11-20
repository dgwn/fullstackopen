import React from 'react'

const Notification = ({message}) => {
  if (message === null) {return null}

  const errorStyle = {
    color: 'white',
    backgroundColor: 'red',
    margin: '10px',
    textAlign: 'center',
    fontSize: '26px'
  }
  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

export default Notification
