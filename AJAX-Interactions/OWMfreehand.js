/**
 * Created by JohnFitzpatrick on 2/14/16.
 */

/*
    Process to format URLs for submission
    omwURL + cityJoin + countryCode + apiJoin + apiKey
    omwURL + zipJoin  + countryCode + apiJoin + apiKey

 */


// generate AJAX request
var req = new XMLHttpRequest();

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    document.getElementById('submit_data').addEventListener('click', function(event) {
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
        var apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';

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



        // The next 4 lines are pretty messy......
        req.open('POST', payload, true);
        req.send(JSON.stringify(payload));
        console.log(JSON.parse(req.responseText));

        event.preventDefault();
    })
}

// To add to HTML
// INCOMPLETE
function outputWeatherData() {
    document.getElementById("span-city").textContent = req.name;
}
