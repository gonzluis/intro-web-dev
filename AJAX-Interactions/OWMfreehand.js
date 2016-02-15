/**
 * Created by JohnFitzpatrick on 2/14/16.
 */

/*
    Process to format URLs for submission
    omwURL + cityJoin + countryCode + apiJoin + apiKey
    omwURL + zipJoin  + countryCode + apiJoin + apiKey

 */
document.addEventListener('DOMContentLoaded', bindButtons);

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

        // If zip is empty, use city and state
        if (zip === '') {
            payload = owmURL + cityJoin + city + state + apiJoin + apiKey;
        }

        // If city, state and/or zip are listed, use zip
        else {
            payload = owmURL + zipJoin + zip + countryCode + apiJoin + apiKey;
        }

        // For debugging
        console.log("*  -  *  -  *  -  *  -  *  -  *  -  *  -  *")
        console.log("City is: ", city);
        console.log("State is: ", state);
        console.log("Zip is: ", zip);
        console.log("Complete URL: ", payload);
        console.log("*  -  *  -  *  -  *  -  *  -  *  -  *  -  *")

        // open and send async. request in required format
        request.open('GET', payload, true);

        // add listener to store JSON data in results if it successfully loads
        request.addEventListener('load', function() {
            if (request.status >= 200 && request.status < 400) {
                result = request.responseText;
                console.log(JSON.parse(result));
            }

            // display an error if it fails to load
            else {
                console.log("Error in network: " + result.statusText);
            }
        });

        // send string to Open Weather Map
        request.send(JSON.stringify(payload));

        // Pause event
        event.preventDefault();
    })
}

// To add to HTML
// INCOMPLETE
function outputWeatherData() {
    document.getElementById("span-city").textContent = result.name;
}
