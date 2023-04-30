import React from 'react'

const WeatherBox = ({weather}) => {
    let src
    if(weather){
        src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    }
  return (
    <div className='weather-box'>
        <div className='weather-left-box'>
            <h2>{weather?.name}</h2>
            <div>{weather?.main.temp}°</div>
        </div>
        <div className='weather-right-box'>
            <img src={weather?src:""}/>
            <div>{weather?.weather[0].description}</div>
        </div>
    </div>
  )
}

export default WeatherBox