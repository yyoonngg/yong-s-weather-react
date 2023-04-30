import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, city, setCity}) => {
  return (
    <div className='weather-button'>
        <Button variant="light" className={city==null || city=="current"?"active":""}><div className='button' onClick={()=>setCity("current")}>현위치</div></Button>
        {cities.map((item)=>(
            <Button variant="light" className={city==item?"active":""}>
                <div className='button' onClick={()=>setCity(item)}>{item}</div>
            </Button>
        ))}
    </div>
  )
}

export default WeatherButton