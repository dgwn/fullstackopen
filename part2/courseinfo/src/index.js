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

  const generateContent = () => parts.map( part => <Part part={part.name} exercises={part.exercises}/>)

  return (
    <div>
      {generateContent()}
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
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
