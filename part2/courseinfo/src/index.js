import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }





  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )
}

const Content = ({ parts }) => {

  const generateContent = () => parts.map( part => <Part part={part.name} exercises={part.exercises} key={part.id}/>)

  return (
    <div>
      {generateContent()}
      <Total parts={parts}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Total = (props) => {



  return (
    <p>Number of exercises: {props.parts.reduce((a, b) => a + b.exercises, 0)} </p>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
