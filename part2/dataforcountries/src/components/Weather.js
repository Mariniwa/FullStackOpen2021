import React from "react"

const Weather = ({ weather }) => {
    const copyWeather = {...weather}
    const image = `http://openweathermap.org/img/wn/${copyWeather.weather[0].icon}@2x.png`
    return (
        <div>
            <h3>
                temperature: <span style={{fontWeight:'normal'}}>{parseInt(copyWeather.main.temp-273)}ºC</span>
            </h3>
            
            <div>
                <img src={image} alt='' />
            </div>
            <h3>
                wind: <span style={{fontWeight:'normal'}}>{copyWeather.wind.speed} mph direction {copyWeather.wind.deg} degrees</span>
            </h3>
        </div>
    )
}

export default Weather