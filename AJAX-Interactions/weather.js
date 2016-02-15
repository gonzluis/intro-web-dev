/**
 * Created by JohnFitzpatrick on 2/14/16.
 */

/*
    Process to format URLs for submission
    omwURL + cityJoin + countryCode + apiJoin + apiKey
    omwURL + zipJoin  + countryCode + apiJoin + apiKey
 */

function bindButtons() {
    document.getElementById('submit_data').addEventListener('click', function(event) {
        // generate AJAX request
        var request = new XMLHttpRequest();
        var result;

        // City:    api.openweathermap.org/data/2.5/weather?q=London,uk
        // Zip:     api.openweathermap.org/data/2.5/weather?zip=94040,us

        // Variables used to build payload URL
        var owmURL = 'http://api.openweathermap.org/data/2.5/weather';
        var cityJoin = '?q=';
        var city = document.getElementById("city").value;
        var state = document.getElementById("state").value;
        state = "," + state.toLowerCase();
        var zipJoin = '?zip=';
        var zip = document.getElementById("zip").value;
        var countryCode = ',us';
        var apiJoin = '&appid=';

        // Old key from lectures: var apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';
        // New key, kind broken, might protect me from robots
        var apiKey = '94365262';
        apiKey += '92fe4f1f';
        apiKey += '43a53e26';
        apiKey += 'b01b18d0';

        var payload;

        /*
         Process to format URLs for submission
         omwURL + city + cityJoin + state + apiJoin + apiKey
         omwURL + zipJoin  + countryCode + apiJoin + apiKey
        */

        // If zip is empty or incomplete, use city and state
        if (zip === '' || zip.length <= 4) {
            payload = owmURL + cityJoin + city + state + apiJoin + apiKey;
        }

        // If city, state and/or zip are listed, use zip
        else {
            payload = owmURL + zipJoin + zip + countryCode + apiJoin + apiKey;
        }

        // For debugging
        console.log("City is: ", city);
        console.log("State is: ", state);
        console.log("Zip is: ", zip);
        console.log("Complete URL: ", payload);

        // open and send async. request in required format
        request.open('GET', payload, true);

        // add listener to store JSON data in results if it successfully loads
        request.addEventListener('load', displayAPIResults);
        request.send(null);

        // stop event from auto-refreshing
        event.preventDefault();
    })
}

// To add to HTML table
function displayAPIResults(response) {
    console.log("Printing response: ", response);

    var rJSON;

    if(response.srcElement.status >= 200 && response.srcElement.status < 400) {
        rJSON = JSON.parse(response.srcElement.responseText);
        console.log(rJSON);
    }

    // Add gathered data to website
    document.getElementById("owm_name").textContent = rJSON.name;
    document.getElementById("owm_main_temp").textContent = kelvinToFahrenheit(rJSON.main.temp) + "F";
    document.getElementById("owm_weather_description").textContent = rJSON.weather[0].description;
    document.getElementById("owm_main_humidity").textContent = rJSON.main.humidity + "%";
    document.getElementById("owm_wind_speed").textContent = msTomph(rJSON.wind.speed);
    document.getElementById("owm_sunrise").textContent = timeConverter(rJSON.sys.sunrise);
    document.getElementById("owm_sunset").textContent = timeConverter(rJSON.sys.sunset);
}

// converts UNIX time to user's local time
// inspired by answer @ http://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    return (hour + ':' + min + ':' + sec);
}

// converts kelvin to fahrenheit
// inspired by basic math
function kelvinToFahrenheit(kelvin) {
    var f = (kelvin * (9/5) - 459.67);
    f = f.toFixed(2);
    return f;
}

// converts m/s to m/h
// inspired by super basic math
function msTomph (speed) {
    speed = speed * 2.2369362620544;
    speed = speed.toFixed(2);
    return speed;
}


// init
function init() {
    document.addEventListener('DOMContentLoaded', bindButtons);
}

// get things going
init();
