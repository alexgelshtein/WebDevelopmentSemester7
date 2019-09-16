async function get_weather() {
  let cityName = document.getElementById("search").value;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=56f83e11e081b27c7005321a05b8af02`
  );
  if (response.ok) {
    let json = await response.json();
    console.log(json);
    document.getElementById("1").innerHTML = json.main.temp + " °C";
    document.getElementById("2").innerHTML = json.clouds.all + " %";
    document.getElementById("3").innerHTML = json.main.humidity + " %";
    document.getElementById("4").innerHTML = json.main.pressure + " mm Hg";
    document.getElementById("5").innerHTML = json.wind.speed + " m/s";
  } else {
    alert("No city found :-(\n\nPlease try again.");
  }
}
document.getElementById("find").addEventListener("click", get_weather);
