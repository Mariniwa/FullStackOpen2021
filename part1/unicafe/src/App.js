import React, { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {

  return (
    <div>
      {text} {value}<br />
    </div>
  )


}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const goodEventHandler = () => {
    setGood(good + 1)
  }

  const neutralEventHandler = () => {
    setNeutral(neutral + 1)
  }

  const badEventHandler = () => {
    setBad(bad + 1)
  }

  const totalNumber = () => {
    const totalScore = good + neutral + bad
    return (
      <>{totalScore}</>
    )
  }
  const averageScore = () => {
    const average = (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
    return <>{average}</>
  }

  const percentagePositive = () => {
    const percentagePositive = (good / (good + neutral + bad) * 100)
    return <>{percentagePositive} %</>
  }

  if (good === 0 & neutral === 0 & bad === 0) {
    return (
      <div>
        <h1>give feedback</h1>

        <Button onClick={goodEventHandler} text="good" />
        <Button onClick={neutralEventHandler} text="neutral" />
        <Button onClick={badEventHandler} text="bad" />

        <h2> statistics</h2>
        no feedback given
      </div>
    )
  }

  return (

    <div>
      <h1>give feedback</h1>

      <Button onClick={goodEventHandler} text="good" />
      <Button onClick={neutralEventHandler} text="neutral" />
      <Button onClick={badEventHandler} text="bad" />

      <h2> statistics</h2>
      <table>
        <tbody>
          <tr>
            <td> <StatisticLine text="good" /></td>
            <td> <StatisticLine value={good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" /> </td>
            <td><StatisticLine value={neutral} /> </td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" /></td>
            <td><StatisticLine value={bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" /></td>
            <td><StatisticLine value={totalNumber()} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" /></td>
            <td><StatisticLine value={averageScore()} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" /></td>
            <td><StatisticLine value={percentagePositive()} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}



export default App