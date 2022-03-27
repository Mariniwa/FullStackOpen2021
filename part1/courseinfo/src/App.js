import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name}, which has {part.exercises} exercises.
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      The contents are listed below:
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

/*const Content = ({ parts }) => {
  return (
    <div>
      The contents are listed below:
      {parts.map((p, i) => <Part part={p} key={i} />)}
    </div>
  )
}*/


const Total = ({parts}) => {
  const exerciseArray = parts.map(part => part.exercises)
  
  let i
  let sum = 0
  for (i = 0; i < exerciseArray.length; i++) {
    sum += exerciseArray[i]
  }
 
  return (
    <p>
      The total number of exercises is {sum}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

 

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>

  )
}

export default App