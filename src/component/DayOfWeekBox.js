import React from 'react'

const DayOfWeekBox = ({dayWeather}) => {
  return (
    <>
        {dayWeather && dayWeather.map((item)=>{
            let day = item.dt;
            let date = new Date(day*1000);
            let dateOfWeek = date.toString().split(' ')[0].toUpperCase();
            let imgSrc = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            if(item.dt != dayWeather[0].dt){
                return(<div className='day-box'>
                    <div className='day'>{dateOfWeek}</div>
                    <img src={imgSrc}/>
                    <div className='day-temp'>{Math.floor(item.temp.min)}° ~ {Math.floor(item.temp.max)}°</div>
                </div>)
            }}
        )}
    </>
        
  )
}

export default DayOfWeekBox