import React from 'react';
import ReactDOM from 'react-dom';



const Course = ({ course }) => {

  return (
    <div>
      <h1>Web Dev Curriculum</h1>
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
    <h2>{props.course}</h2>
  )
}

const Total = (props) => {



  return (
    <p>Number of exercises: {props.parts.reduce((a, b) => a + b.exercises, 0)} </p>
  )
}


export default Course
