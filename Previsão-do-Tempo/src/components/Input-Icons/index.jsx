import { useEffect, useRef, useState } from "react";
import "./index.css";

export const InputIcons = ({ city, setCity, getWeather }) => {
  const [coordinates, setCoordinates] = useState({});
  const dropBox = useRef();

  useEffect(() => {
    getCityInitial();

    document.addEventListener("click", (e) => {
      if (dropBox.current !== e.target) {
        setCoordinates({});
      }
    });

    return () => document.removeEventListener("click");
  }, []);

  const getCity = (city) => {
    setCity(city);
    setCoordinates({});
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
      .then((resp) => resp.json())
      .then((json) => {
        setCoordinates(json);
      })
      .catch((err) => console.log(err));
  };

  const getCityInitial = () => {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
      .then((resp) => resp.json())
      .then((json) => {
        var { latitude, longitude } = json.results[0];
        getWeather(latitude, longitude);
      })
      .catch((err) => console.log(err));
  };

  const changeCity = (element) => {
    setCity(element.name);
    var { latitude, longitude } = element;
    getWeather(latitude, longitude);
    setCoordinates({});
  };

  const keyDown = (event) => {
    if (event.key !== "Enter") return;

    var { latitude, longitude } = coordinates.results[0];
    getWeather(latitude, longitude);
    setCoordinates({});
  };

  const openBox = () => {
    const weather = document.getElementsByClassName("box-weather")[0];
    const weatherWeek = document.getElementsByClassName("box-week")[0];

    weather.classList.add("animation-weather");
    weatherWeek.classList.add("animation-week");
  };

  const typeInput = () => {
    const input = document.getElementById("input");
    input.focus();
  };

  return (
    <div className="input-text">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-geo-alt-fill"
        viewBox="0 0 16 16"
        onClick={typeInput}
      >
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      </svg>
      <div>
        <input
          id="input"
          type="text"
          value={city}
          onChange={(e) => getCity(e.target.value)}
          placeholder="Digite o nome da cidade..."
          onKeyDown={keyDown}
          autoComplete="off"
        />
        <div ref={dropBox} className="drop-box">
          {coordinates?.results?.map((element, idx) => (
            <div key={idx} className="item" onClick={(e) => changeCity(element)}>
              <span>{element.name}</span>
              <span>- {element.admin1 ?? element.country}</span>
            </div>
          ))}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-calendar3"
        viewBox="0 0 16 16"
        onClick={openBox}
      >
        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      </svg>
    </div>
  );
};
