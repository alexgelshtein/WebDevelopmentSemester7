window.onload = function () {
    document.getElementById("form1")
        .addEventListener("submit", function (event) {
            let enteredCity = event.target[0].value;
            event.preventDefault();
            let requestForecast = getWeather(enteredCity);
            handleErrors(requestForecast);
        });
}

function getWeather(cityName) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=56f83e11e081b27c7005321a05b8af02', false);
    xhr.send();
    return xhr;
}

function handleErrors(xhr) {
    if (xhr.status === 404 || xhr.status === 500) {
        let pagefnerror = doT.template(document.getElementById('errortmpl').text);
        let error = {
            text: xhr.statusText,
            code: xhr.status
        }
        document.getElementById('content').innerHTML = pagefnerror(error);
    } else {
        parse(xhr);
    }
}

function parse(xhr) {
    let response = JSON.parse(xhr.responseText);
        let data = {
            city: response.name,
            temp: (response.main.temp - 273.15).toFixed(2),
            windSpeed: response.wind.speed,
            sky: response.weather[0].description,
            pressure: (response.main.pressure * 0.75).toFixed(1),
            humidity: response.main.humidity,
        }
        let pagefn = doT.template(document.getElementById('pagetmpl').text);
        document.getElementById('content').innerHTML = pagefn(data);
}