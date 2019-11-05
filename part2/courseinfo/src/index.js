import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  const generateCourses = () => courses.map( currentCourse => <Course course={currentCourse}/> )


  return (
    <div>
      {generateCourses()}
    </div>
  )
}

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


ReactDOM.render(<App />, document.getElementById('root'));
