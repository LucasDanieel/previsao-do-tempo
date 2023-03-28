import "./index.css";

export const ArrowText = ({ city }) => {

  const closeBox = () =>{
    const weather = document.getElementsByClassName("box-weather")[0];
    const weatherWeek = document.getElementsByClassName("box-week")[0];

    weather.classList.remove("animation-weather");
    weatherWeek.classList.remove("animation-week");
  }

  return (
    <div className="arrow-text">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrow-left"
        viewBox="0 0 16 16"
        onClick={closeBox}
      >
        <path
          fillRule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>
      <span>{city}</span>
    </div>
  );
};
