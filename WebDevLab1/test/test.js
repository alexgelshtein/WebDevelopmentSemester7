
describe('WeatherTests', function() {

    before(function () {
        this.srv = sinon.createFakeServer();
        this.srv.respondImmediately = true;
    });

    after(function () {
        this.srv.restore();
    });

    it('should process successful response correctly', function () {

        this.srv.respondWith("GET", 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=56f83e11e081b27c7005321a05b8af02&q=moscow', [200, {}, JSON.stringify(apiResponseMock)]);
        let weather = getWeather('Moscow');
        chai.assert.strictEqual(weather.error, null);
        chai.assert.strictEqual(weather.city, "Moscow");
        chai.assert.strictEqual(weather.temp, 1.48);
        chai.assert.strictEqual(weather.minTemp, 1);
        chai.assert.strictEqual(weather.maxTemp, 2.22);
        chai.assert.strictEqual(weather.windSpeed, 3);
        chai.assert.strictEqual(weather.sky, "light intensity drizzle");
        chai.assert.strictEqual(weather.pressure, 1011);
        chai.assert.strictEqual(weather.humidity, 100);
    });

    it('should process not found city response correctly', function () {

        this.srv.respondWith("GET", 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=56f83e11e081b27c7005321a05b8af02&q=moscow', [404, {}, ""]);
        let weather = getWeather('Moscow');
        chai.assert.strictEqual(weather.error, "NotFound");
    });

    it('should process not found city response correctly', function () {

        this.srv.respondWith("GET", 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=56f83e11e081b27c7005321a05b8af02&q=moscow', [500, {}, ""]);
        let weather = getWeather('Moscow');
        chai.assert.strictEqual(weather.error, "Internal Server Error");
        chai.assert.strictEqual(weather.errorCode, 500);
    });

    describe('RenderTests', function () {
        it('should render moscow temp correctly', function () {

            this.srv.respondWith("GET", 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=56f83e11e081b27c7005321a05b8af02&q=moscow', [200, {}, JSON.stringify(apiResponseMock)]);
            render(getWeather('Moscow'), 'Moscow');
            let weatherTags = document.getElementById('weather').children;
            chai.assert.equal(weatherTags[0].innerText, "Weather in city Moscow");
            chai.assert.equal(weatherTags[1].innerText, "Temperature: 1.48 ˚C");
            chai.assert.equal(weatherTags[2].innerText, "Min temperature: 1 ˚C");
            chai.assert.equal(weatherTags[3].innerText, "Max temperature: 2.22 ˚C");
            chai.assert.equal(weatherTags[4].innerText, "Wind Speed: 3 m/s");
            chai.assert.equal(weatherTags[5].innerText, "Sky status: light intensity drizzle");
            chai.assert.equal(weatherTags[6].innerText, "Pressure: 1011 hPa");
            chai.assert.equal(weatherTags[7].innerText, "Humidity: 100%");
        });

        it('should render not found city error correctly', function () {

            this.srv.respondWith("GET", 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=56f83e11e081b27c7005321a05b8af02&q=moscow', [404, {}, ""]);
            render(getWeather('Moscow'), 'Moscow');
            weatherDiv = document.getElementById('weather');
            errorDiv = weatherDiv.children[0];
            chai.assert.strictEqual(errorDiv.className, "error");
            chai.assert.strictEqual(errorDiv.children[0].innerText, "City Moscow is not found");
        });

        it('should process not found city response correctly', function () {

            this.srv.respondWith("GET", 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=56f83e11e081b27c7005321a05b8af02&q=moscow', [500, {}, ""]);
            let weather = getWeather('Moscow');
            render(getWeather('Moscow'), 'Moscow');
            weatherDiv = document.getElementById('weather');
            errorDiv = weatherDiv.children[0];
            chai.assert.strictEqual(errorDiv.className, "error");
            chai.assert.strictEqual(errorDiv.children[0].innerText, "An error has occured");
            chai.assert.strictEqual(errorDiv.children[1].innerText, "Code: 500");
            chai.assert.strictEqual(errorDiv.children[2].innerText, "Text: Internal Server Error");
        });

    });

    mocha.run();

});