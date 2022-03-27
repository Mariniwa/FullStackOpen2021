import React, { useEffect, useState } from "react"
import axios from 'axios'
import Weather from './Weather'


const ShowWeather = ({ country }) => {

    const [weather, setWeather] = useState(null)
    
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_MY_API_KEY}`)
            .then(response => {
                setWeather(response.data)
            }
            )
    }, [country.capital])

    if (!weather) return <div>loading...</div>
    return (
        <Weather country={country} weather={weather} />
    )
}

export default ShowWeather