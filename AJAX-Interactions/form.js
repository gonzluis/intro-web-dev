/**
 * Created by JohnFitzpatrick on 2/15/16.
 */

function pasteBin() {
    document.getElementById('button_submit').addEventListener('click', function(event) {
        var request = new XMLHttpRequest();
        var urlSubmission = 'http://httpbin.org/post';
        var payload = {
            'form_city' : null,
            'form_temperature' : null,
            'form_weather' : null,
            'form_humidity' : null,
            'form_wind' : null,
        };

        payload.form_city = document.getElementById('form_city').value;
        payload.form_temperature = document.getElementById('form_temperature').value;
        payload.form_weather = document.getElementById('form_weather').value;
        payload.form_humidity = document.getElementById('form_humidity').value;
        payload.form_wind = document.getElementById('form_wind').value;

        request.open('POST', urlSubmission, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('load', function() {

            if (req.status >= 200 && req.status < 400) {
                var result = JSON.parse(JSON.parse(req.responseText).data);
                console.log(result);
                postResponse(result);
            } else {
                console.log("Error in network: " + result.status);
            }
        });
        request.send(JSON.stringify(payload));
        event.preventDefault();
    });
}