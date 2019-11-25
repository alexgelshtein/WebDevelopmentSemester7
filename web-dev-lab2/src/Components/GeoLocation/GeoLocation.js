import React from 'react'

class GeoLocation extends React.Component {
    state = {
        isLoaded: false,
        info: [],
        fail: false,
        default: false
    };

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setGeo, this.setDefault);
        } else {
            console.log("Geo location is not supported by this browser.");
        }
    }

    setGeo = (position) => {
        this.setState ({
            isLoaded: false
        });
        this.getWeather(position.coords.latitude, position.coords.longitude);
    };

    setDefault = (error) => {
        console.log("Error: " + error.message);
        this.setState ({
            isLoaded: false,
            default: true
        });
        this.getWeather(51.509865, -0.118092);
    }

    getWeather = (latitude, longitude) => {
        this.setState ({
            isLoaded: false
        });

        const appid = "56f83e11e081b27c7005321a05b8af02";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${appid}&units=metric`;

        fetch (url).then(res => res.json())
            .then(
                (res) => {
                    this.setState ({
                        data: res,
                        isLoaded: true,
                        fail: false
                    });
                    console.log(this.state.data);
                },
                (error) => {
                    this.setState ({
                        isLoaded: true,
                        fail: true,
                        error
                    });
                }
            )
    }

    render() {
        const deafultMsg = (
            <div>Here is deafult city
                <button onClick={() => navigator.geolocation.getCurrentPosition(this.setGeo, this.setDeafult)}>
                    Update geo
                </button>
            </div>
        );
        
        if (this.state.fail) {
            return(
                <div>Problem occured
                    <button onClick={() => navigator.geolocation.getCurrentPosition(this.setGeo, this.setDefault)}>
                        Update geo
                    </button>
                </div>
            )
        }

        if (this.state.isLoaded) {
            return(
                <div>
                    <h3>
                        {this.state.default ? deafultMsg : ''}
                    </h3>
                    <ul>{this.state.data.name}
                        <li>{this.state.data.main.temp}</li>
                        <li>{this.state.data.main.humidity}</li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}

export default GeoLocation;