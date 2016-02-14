/**
 * Created by JohnFitzpatrick on 2/14/16.
 */

var reqOWM = new XMLHttpRequest();
reqOWM.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Chicago,il&appid=fa7d80c48643dfadde2cced1b1be6ca1", false);
reqOWM.send(null);
console.log(JSON.parse(reqOWM.responseText));