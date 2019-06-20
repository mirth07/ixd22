var map = L.map('mapid').setView([28.615382, -80.694550], 11);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Your landing information!'
    }).addTo(map);

var marker = L.marker([28.615382, -80.694550], {
	color: 'red',
}).addTo(map) 
    .bindPopup('Welcome home.<br> Have a safe landing, right over here.')
    .openPopup();

var circle = L.circle([28.598682, -80.678667], {
    color: 'white',
    fillColor: 'white',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map)
	circle.bindPopup('You can rest over here from your long trip, with some food an drinks.');

var circle = L.circle([28.574004, -80.647024], {
    color: 'white',
    fillColor: 'white',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map)
	circle.bindPopup('Here is the Space Center. Report your trip!');

var circle = L.circle([28.593172, -80.716959], {
    color: 'white',
    fillColor: 'white',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map)
	circle.bindPopup('Weather good? You can swim here.');
	


function getAPIdata() {

	var url = "https://api.openweathermap.org/data/2.5/weather";
	var apiKey ="b0c8dafa512a0134e90df6ece3c2b7a2";
	var city = "florida";

	// construct request
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	// render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = degC + "&#176;C <br>" + type;
}


function onAPIError(error) {
	console.error('Request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}

// init data stream
getAPIdata();

