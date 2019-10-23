window.onload = function () {
    document.getElementById("form1")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            getWeather();
        });
}

function getWeather() {
    var enteredCity = document.getElementById('userCity').value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + enteredCity + '&appid=56f83e11e081b27c7005321a05b8af02', false);
    xhr.send();
    if (xhr.status == 404) {
        var pagefnerror = doT.template(document.getElementById('errortmpl').text, undefined);
        var error = {
            text: xhr.statusText,
            code: xhr.status
        }
        document.getElementById('content').innerHTML = pagefnerror(error);
    } else {
        var response = JSON.parse(xhr.responseText);
        var data = {
            city: response.name,
            temp: (response.main.temp - 273.15).toFixed(2),
            windSpeed: response.wind.speed,
            sky: response.weather[0].description,
            pressure: response.main.pressure,
            humidity: response.main.humidity,
        }
        var pagefn = doT.template(document.getElementById('pagetmpl').text, undefined);
        document.getElementById('content').innerHTML = pagefn(data);
    }
}