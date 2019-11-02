import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }

  const getTotalVotes = () => {
    return good + neutral + bad;
  }

  const getAverage = () => {
    let total = getTotalVotes();
    return ((good - bad) / total);
  }

  const getPositive = () => {
    let total = getTotalVotes();
    return (good/total) * 100;
  }


  return (
    <div>
      <h1>Give Feedback!</h1>
      <Button rating="good" handler={handleGoodClick}/>
      <Button rating="neutral" handler={handleNeutralClick}/>
      <Button rating="bad" handler={handleBadClick}/>
      <h2>Statistics</h2>
      <Stat rating="good votes:" votes={good}/>
      <Stat rating="neutral votes:" votes={neutral}/>
      <Stat rating="bad votes:" votes={bad}/>
      <Stat rating="all votes:" votes={ getTotalVotes() }/>

      {getTotalVotes() > 0 &&
      <Stat rating="average:" votes={ getAverage() } />
      }
      {getTotalVotes() > 0 &&
      <Stat rating="positive:" votes={ getPositive() + "%"} />
      }

    </div>
  )
}

const Stat = (props) => {
  return (
    <p>{props.rating} {props.votes}</p>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.rating}</button>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
