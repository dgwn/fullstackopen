import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ( {capital} ) => {

  const [ currentWeather, setCurrentWeather ] = useState({})
  const [ updated, setUpdated ] = useState(false)

  useEffect( () => {
    const url = 'http://api.weatherstack.com/current?access_key=d17c778da5310be1f2ac6011aff139ad&query='
    axios
      .get(url+capital)
      .then(response => {
        setCurrentWeather(response.data.current)
        setUpdated(true)
      })
  }, [updated, capital])



  return (
    <div>
      <h3>Current Conditions in {capital}:</h3>
      <h4>Temperature: {currentWeather.temperature} Celsius</h4>
      <img src={currentWeather.weather_icons} alt="conditions preview"/>
      <h4>Wind: {currentWeather.wind_speed}kph {currentWeather.wind_dir}</h4>
    </div>
  )
}

export default Weather
