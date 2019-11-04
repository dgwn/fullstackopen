import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [mostPopular, setMostPopular] = useState("");
  const [mostPoints, setMostPoints] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

  const randomize = () => () => {
    let current = Math.floor(Math.random() * Math.floor(anecdotes.length))
    setSelected(current);
  }

  const handleVote = () => {

    const copy = [...points];
    copy[selected]+= 1

    if (copy[selected] > mostPoints) {
      setMostPopular(anecdotes[selected])
      setMostPoints(copy[selected])
    }

    setPoints(copy)
  }





  return (
    <div>
      {props.anecdotes[selected]}
      <br/>
      <button onClick={handleVote}>vote</button>
      <button onClick={randomize()}>next anecdote</button>
      {mostPoints > 0 && <p>"{mostPopular}" has {mostPoints} point(s).</p> }



    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
