import { useState } from "react";
import { ArrowText } from "../../components/Arrow-Text";
import { Forecast } from "../../components/Forecast";
import { InputIcons } from "../../components/Input-Icons";
import { Weather } from "../../components/Weather";
import { WeatherWeek } from "../../components/Weather-Week";
import "./index.css";

function Home() {
  const [city, setCity] = useState("São Paulo");
  const [weather, setWeather] = useState({});

  const getWeather = (latitude, longitude) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=America%2FSao_Paulo`
    )
      .then((resp) => resp.json())
      .then((json) => {
        setWeather(json);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="box-weather">
        <InputIcons city={city} setCity={setCity} getWeather={getWeather} />
        <Weather currentWeather={weather.current_weather} />
        <Forecast weather={weather} />
      </div>
      <div className="box-weather box-week">
        <ArrowText city={city} />
        <WeatherWeek nextWeek={weather.daily} />
      </div>
    </div>
  );
}

export default Home;
