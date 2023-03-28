export const formatDate = (date) => {
  const weekday = [
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
    "Domingo",
  ];
  var format = new Date(date);

  return weekday[format.getDay()];
};

export const formatToday = (hourly) => {
  if (hourly === undefined) return;
  var hour = new Date().getHours();

  var time = [];
  var tempCode = [];
  var temp = [];

  for (var i = 0; i <= 23; i++) {
    time.push(hourly.time[hour + i].split("T")[1]);
    tempCode.push(hourly.weathercode[hour + i]);
    temp.push(Math.round(hourly.temperature_2m[hour + i]));
  }

  return {
    time,
    tempCode,
    temp,
  };
};

export const formatWeek = (daily) => {
  if (daily === undefined) return;

  const weekday = ["Seg", "Terç", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  var date = new Date();
  var array = [];

  daily.time.forEach((element) => {
    var format = new Date(element);
    var day = element.split("-");
    var name = `${date.getDate() === day[2] ? "Hoje" : weekday[format.getDay()]}, ${day[2]} ${months(day[1])}`;
    array.push(name);
  });

  return array;
};

const months = (idx) => {
  switch (idx) {
    case "01":
      return "Jan";
    case "02":
      return "Fev";
    case "03":
      return "Mar";
    case "04":
      return "Abr";
    case "05":
      return "Maio";
    case "06":
      return "Jun";
    case "07":
      return "Jul";
    case "08":
      return "Ago";
    case "09":
      return "Set";
    case "10":
      return "Out";
    case "11":
      return "Nov";
    case "12":
      return "Dez";

    default:
      return "NaN";
  }
};
