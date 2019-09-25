async function get_weather() {
  let cityName = document.getElementById("search").value;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=56f83e11e081b27c7005321a05b8af02`
  );
  if (response.ok) {
    let json = await response.json();
    console.log(json);
    document.getElementById("temp").innerHTML = "Temperature:" + "</br></br>" + json.main.temp + " °C";
    document.getElementById("desc").innerHTML = "Description:" + "</br></br>" + json.weather["0"].description;
    document.getElementById("humid").innerHTML = "Humidity:" + "</br></br>" + json.main.humidity + " %";
    document.getElementById("pres").innerHTML = "Pressure:" + "</br></br>" + json.main.pressure + " hPa";
    document.getElementById("wind").innerHTML = "Wind speed:" + "</br></br>" + json.wind.speed + " m/s";
  } else {
    alert("No city found :-(\n\nPlease try again.");
  }
}
document.getElementById("find").addEventListener("click", get_weather);
