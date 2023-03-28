import { formatDate } from "../../utils/formatStuffs";
import { iconsWeekday } from "../../utils/icons-weather";
import "./index.css";

export const WeatherWeek = ({ nextWeek }) => {
  const classIcons = (code) => {
    switch (code) {
      case 0:
      case 1:
        return "orange";
      case 2:
      case 3:
        return;

      default:
        return "blue";
    }
  };

  return (
    <div className="next-week">
      <span>Próxima semana</span>
      <div className="weekday">
        {nextWeek?.time.map((e, idx) => (
          <div key={idx} className="weather-weekday">
            <div className="name-week">
              <span>{formatDate(e)}</span>
            </div>
            <div className="temp">
              <span>
                {Math.round(nextWeek.temperature_2m_max[idx])}°{" "}
                <span>{Math.round(nextWeek.temperature_2m_min[idx])}°</span>
              </span>
            </div>
            <div className={`svg-temp svg-temp-${idx} ${classIcons(nextWeek.weathercode[idx])}`}>
              {iconsWeekday(nextWeek.weathercode[idx], `.svg-temp-${idx}`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
