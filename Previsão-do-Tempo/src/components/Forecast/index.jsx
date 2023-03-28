import { useEffect, useRef, useState } from "react";
import { formatToday, formatWeek } from "../../utils/formatStuffs";
import { iconsWeekday } from "../../utils/icons-weather";
import { moveScroll } from "../../utils/scrollBar";
import "./index.css";

export const Forecast = ({ weather }) => {
  const [week, setWeek] = useState([]);
  const [today, setToday] = useState({});
  const scrollWeek = useRef();
  const scrollToday = useRef();

  useEffect(() => {
    const id = setTimeout(() => {
      moveScroll([scrollWeek, scrollToday]);
    }, 200);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    scrollWeek.current.scrollLeft = 0
    scrollToday.current.scrollLeft = 0
    var weekNames = formatWeek(weather.daily);
    var today = formatToday(weather.hourly);
    setWeek(weekNames);
    setToday(today);
  }, [weather]);

  return (
    <div className="forecast">
      <div className="week">
        <div ref={scrollWeek} className="scrolling">
          {week?.map((w, idx) => (
            <div key={idx} className="day">
              <span>{w}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="today">
        <div ref={scrollToday} className="scrolling">
          {today?.time?.map((t, idx) => (
            <div key={idx} className="box-hour">
              <div className="hour">
                <span>{t} AM</span>
              </div>
              <div className={`icon-weather icon-weather-${idx}`}>
                {iconsWeekday(today.tempCode[idx], `.icon-weather-${idx}`)}
              </div>
              <div className="weather">
                <span>{today.temp[idx]}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
