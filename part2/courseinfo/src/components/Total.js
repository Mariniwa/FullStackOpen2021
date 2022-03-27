import React from 'react'

const Total = ({ parts }) => {

    const exercisesArray = parts.map(p => p.exercises)
    const sumValue = exercisesArray.reduce((previousValue, nextValue) => {
        return previousValue + nextValue
    }, 0)

    return (
        <h3>
            total of {sumValue} exercises
        </h3>
    )
}

export default Total;