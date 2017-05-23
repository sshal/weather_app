import React from 'react';

class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.convert = this.convert.bind(this);
        this.loc = {lati: this.props.lat, long: this.props.lon};
        this.icons = {
            "Clear": "<img src='https://image.ibb.co/kUGTVv/clear.png' alt='clear'/>",
            "Clouds": "<img src='https://image.ibb.co/cjphqv/clouds.png' alt='clouds'/>",
            "Drizzle": "<img src='https://image.ibb.co/f6yLca/drizzle.png' alt='drizzle'/>",
            "Snow": "<img src='https://image.ibb.co/han2qv/snow.png' alt='snow'/>",
            "Fewclouds": "<img src='https://image.ibb.co/hRiaAv/fewclouds.png' alt='fewclouds'/>",
            "Thunderstorm": "<img src='https://image.ibb.co/myu43F/thunderstorm.png' alt='storm'/>",
            "Rain": "<img src='https://image.ibb.co/cZ3aAv/rain.png' alt='rain'/>"
        }
        this.city = "Click the buttons!";
        this.tCe = "";
        this.tFa = "";
        this.tempC = true;
        this.wind = "";
    }
    getCoordinates() {
        var show = function(position) {
            this.loc.lati = position.coords.latitude.toFixed(6);
            this.loc.long = position.coords.longitude.toFixed(6);
            this.setState({});
        }.bind(this);
        navigator.geolocation.getCurrentPosition(show);
        setTimeout(this.getWeather, 2000);
    }
    getWeather() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                var result = JSON.parse(req.response),
                    icons = Object.keys(this.icons),
                    weather = result.weather[0].main,
                    image;
                this.city = `${result.name}, ${result.sys.country}`;
                this.tCe = Math.round(result.main.temp - 273.15);
                this.tFa = Math.round(this.tCe * 9 / 5 + 32);
                this.wind = `${result.wind.speed} m/s`;
                if (result.weather[0].description === "few clouds") {
                    image = this.icons["Fewclouds"];
                } else if (weather === "Rain" && result.weather[0].description !== "light rain") {
                    image = this.icons["Drizzle"];
                } else if (icons.includes(weather)) {
                    image = this.icons[weather];
                } else {
                    image = this.icons["Clouds"];
                }
                document.getElementById('icon').innerHTML = image;
                this.setState({});
            }
        }.bind(this);
        if (this.loc.lati) {
            req.open("POST", `http://api.openweathermap.org/data/2.5/weather?lat=${this.loc.lati}&lon=${this.loc.long}&APPID=3b14e14e1d53bf4337abe31433667172`, true);
        } else {
            req.open("POST", `http://api.openweathermap.org/data/2.5/weather?q=London&APPID=3b14e14e1d53bf4337abe31433667172`, true);
        }
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.setRequestHeader("Accept", "application/json");
        req.send();
        this.setState({});
    }
    convert() {
        if (this.tempC) {
            this.tempC = false;
            document.getElementById('sym').innerHTML = "&#176;F";
        } else {
            this.tempC = true;
            document.getElementById('sym').innerHTML = "&#176;C";
        }
        this.setState({});
    }
    render() {
        var tempr;
        tempr = (this.tempC) ? this.tCe : this.tFa;
        return (
        <div>
            <h2>Weather App</h2>
            <p className="city">{this.city}</p>
            <p id="temper" onClick={this.convert}>{tempr}<span id="sym">&#176;C</span></p>
            <p className="wind">wind: {this.wind}</p>
            <div id="icon"><img src='https://image.ibb.co/kUGTVv/clear.png' alt='clear'/></div>
            <button onClick={this.getWeather} className="wea">Weather</button>
            <button onClick={this.getCoordinates} className="coor">My place</button>
        </div>
        )
    }
}

module.exports = WeatherApp;
