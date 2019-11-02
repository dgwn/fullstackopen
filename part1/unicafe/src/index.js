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
      {getTotalVotes() > 0 && <Statistics good={good}
                  neutral={neutral}
                  bad={bad}
                  getTotalVotes={getTotalVotes()}
                  getAverage={getAverage()}
                  getPositive={getPositive()}
                  />
      }


    </div>
  )
}

const Statistic = (props) => {
  return (
    <p>{props.rating} {props.votes}</p>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <Statistic rating="good votes:" votes={props.good}/>
      <Statistic rating="neutral votes:" votes={props.neutral}/>
      <Statistic rating="bad votes:" votes={props.bad}/>
      <Statistic rating="all votes:" votes={ props.getTotalVotes }/>
      <Statistic rating="average:" votes={ props.getAverage } />
      <Statistic rating="positive:" votes={ props.getPositive + "%"} />
    </div>

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
