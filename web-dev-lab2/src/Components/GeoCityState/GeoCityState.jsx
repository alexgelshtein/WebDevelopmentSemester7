import * as React from 'react';
import './GeoCityState.scss'

export const GeoCityState = (props) => {
    const [weatherInfo, updateWeatherInfo] = React.useState({});
    const [loading, isLoading] = React.useState(false);
    const { city, coordinates, onRemove, main } = props;
    const appid = "56f83e11e081b27c7005321a05b8af02";

    const componentDidMount = (city, coordinates) => {
        var url = null;
        if (coordinates)
            url = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&APPID=${appid}&units=metric`;
        else
            url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appid}&units=metric`;

        return fetch(url)
            .then(data => data.json())
            .then(json => {
                const info = json;
                console.log(info);
                var cityValue = {
                    city: info.name,
                    description: info.weather[0].description,
                    temperature: `${info.main.temp} C`,
                    humidity: `${info.main.humidity} %`,
                    pressure: `${info.main.pressure} hPa`,
                    wind: `${info.wind.speed} m/s`,
                    icon: info.weather[0].icon
                };
                updateWeatherInfo(cityValue);
                isLoading(false);
            })
            .catch(err => {
                console.log(err);
                isLoading(false);
                return updateWeatherInfo({ city, err: '404. City was not found.' });
            })
    }

    React.useEffect(() => {
        if (city || coordinates) {
            isLoading(true);
            componentDidMount(city, coordinates);
        }
        else {
            isLoading(true);
            componentDidMount("London", coordinates);
        }
    }, [city, coordinates]);

    if (loading)
        return (<div>loading... Please, wait.</div>);

    var btn = null;
    if (!coordinates)
        btn = <button className={`delete-btn`} onClick={() => onRemove(city)}>Delete</button>

    if (weatherInfo.error) {
        return (
            <div>
                {city}: {weatherInfo.error}
                {btn}
            </div>);
    }

    const generateHtml = (cityState, isMain) => {
        return (
            <div className={`weather-container${isMain ? ' weather-main-element' : ''}`}>
                <div className="weather-container-main-info">
                    <h1 className="weather-container-city">{cityState.city}</h1>
                    <div className="weather-container-icon-block">
                        <div>
                            <img src={`http://openweathermap.org/img/wn/${cityState.icon}@2x.png`} alt={cityState.icon} />
                        </div>
                        <h2 className="weather-container-temperature">{cityState.temperature}</h2>
                    </div>
                    {isMain ? '' : btn}
                </div>
                <ul className="weather-container-list">
                    <li className="weather-container-item">
                        Description: {cityState.description}
                    </li>
                    <li className="weather-container-item">
                        Temperature: {cityState.temperature}
                    </li>
                    <li className="weather-container-item">
                        Humidity: {cityState.humidity}
                    </li>
                    <li className="weather-container-item">
                        Pressure: {cityState.pressure}
                    </li>
                    <li className="weather-container-item">
                        Wind: {cityState.wind}
                    </li>
                </ul>
            </div>
        );
    }

    return generateHtml(weatherInfo, main);
}

export default GeoCityState;