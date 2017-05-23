import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './components/WeatherApp.jsx';

(function startApp() {
    var lat, lon;
    var findCity = new XMLHttpRequest();
    findCity.open("GET", "http://ip-api.com/json", true);
    findCity.onreadystatechange = function() {
        if(findCity.readyState == 4 && findCity.status === 200) {
            var res = JSON.parse(findCity.response);
            lat = res.lat;
            lon = res.lon;
        }
    };
    findCity.send();
    setTimeout(function () {
        ReactDOM.render(<WeatherApp lat={lat} lon={lon}/>, document.getElementById('main'));;
    }, 1000);
}());
