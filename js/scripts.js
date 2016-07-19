window.onload = init_JS;

var days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
var months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
var weatherArray = ["na", "Windy", "Windy", "thunderstorms", "thunderstorms", "sleet", "sleet", "sleet", "rain_light", "rain_light",
					"rain_heavy", "rain_light", "rain_light", "snow", "snow_light", "snow", "snow", "sleet", "sleet", "Windy",
					"fog", "mist", "mist", "mist", "Windy", "na", "cloudy", "cloudy", "cloudy", "partly_cloudy",
					"partly_cloudy", "sunny", "sunny", "sunny", "sunny", "rain_light", "sunny", "thunderstorms", "thunderstorms", "rain_light",
					"rain_light", "snow", "snow_light", "snow", "partly_cloudy", "thunderstorms", "snow_light", "thunderstorms", "na"];

function init_JS()
{
	setClock();
	getWeather();
}

function setClock()
{
	var date = new Date();
	d = date.getDay();		// dzień tygodnia (0-6)
	D = date.getDate();		// dzień miesiąca (1-31)
	M = date.getMonth();	// miesiąc (0-11)
	Y = date.getFullYear();	// rok (4 cyfr)
 
	h = date.getHours();	// godzina (24h)
	m = date.getMinutes();	// minuta (0-59)
	s = date.getSeconds();	// sekunda (0-59)

	if(m < 10) m = "0" + m;
	if(s < 10) s = "0" + s;

	document.getElementById("clock").innerHTML = "<h6>" + h + ":" + m + ":" + s + "</h6>";
	document.getElementById("date").innerHTML = days[d] + ", " + D + " " + months[M];
	setTimeout("setClock()",1000);
}

function getWeather()
{
	var xmlhttp = new XMLHttpRequest();
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22legnica%2C%20poland%22)%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

	xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var json = JSON.parse(xmlhttp.responseText);
			document.getElementById("weather_temp").innerHTML = '<h6>' + json.query.results.channel.item.condition.temp + '°</h6>';
			document.getElementById("weather_icon").setAttribute("src", "img/weather/" + weatherArray[json.query.results.channel.item.condition.code] + ".png");
			document.getElementById("weather_con").innerHTML = json.query.results.channel.item.condition.text;
		}
	};

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}