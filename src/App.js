import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import DayOfWeekBox from "./component/DayOfWeekBox";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";

//1. 웹이 실행되자마자 현재위치기반의 날씨가 보인다. o
//2. 날씨정보에는 도시, 섭씨 날씨상태 o
//3. 5개의 버튼이 있다.(1개는 현재위치 4개는 다른도시) o
//4. 도시버튼을 클릭할때 마다 도시별 날시가 나온다 o
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다. o
//6. 데이터를 들고 오는 동안 로딩스피터가 돈다. o
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["Seoul", "Tokyo", "Los angeles", "Paris"];
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(null);
  const [dayWeather, setDayWeather] = useState(null);
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
      getWeatherByDay(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(err){
      setAPIError(err.message);
    }
  };

  const getWeatherByCity = async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    getWeatherByDay();
    setLoading(false);
    }catch(err){
      setAPIError(err.message);
    }
    
  };

  const getWeatherByDay = async (lat, lon) => {
    try{
      let url;
      if ((lat, lon)) {
        url = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=7`;
      } else {
        url = `https://pro.openweathermap.org/data/2.5/forecast/climate?q=${city}&appid=${API_KEY}&units=metric&cnt=7`;
      }
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setDayWeather(data.list);
      setLoading(false);
    }catch(err){
      setAPIError(err.message);
    }
    
  };

  useEffect(() => {
    if (city == null || city == "current") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="container">
      {loading ? (
        <div className="container">
          <ClipLoader color="steelblue" loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className="container">
          <div className="top-container">
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} city={city} setCity={setCity} />
          </div>
          <div className="bottom-container">
            <DayOfWeekBox dayWeather={dayWeather}/>
          </div>
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
