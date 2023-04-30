import React from "react";

const DayWeatherBox = ({ dayOfWeek, iconOfWeek, maxTempOfWeek, minTempOfWeek }) => {
  let day = new Date(dayOfWeek * 1000).toString().split(" ")[0];
  let src = `https://openweathermap.org/img/wn/${iconOfWeek}@2x.png`;
  return (
    <div className="day-box">
      <div className="day">{day}</div>
      <img src={src} />
      <div className="day-temp">{Math.floor(minTempOfWeek)}° ~ {Math.floor(maxTempOfWeek)}°</div>
    </div>
  );
};

export default DayWeatherBox;
