$(function() {

	const apiKey = "";
	let currentWeather = {};
	let threeDayForecast = {};
	let sevenDayForecast = {};

	$("#zip-input").keyup(e => {
		if (e.key === "Enter") {
			validateAndLoad();
		}
	});
	$("#submit-button").click(() => {
			validateAndLoad();
	});

	const validateAndLoad = () => {
		let userZIP = $("#zip-input").val();
		if (validateZIP(userZIP) === true) {
			Promise.all([callCurrentWeather(userZIP), callForecast(userZIP)])
			.then(data => displayCurrentWeather(data))
			.catch(error => (console.log(error)));
		} else {
			//Throw Errors;
		}
	};

	const validateZIP = ZIP => {
		let userZIP = ZIP.trim();
		if (userZIP.length === 5 && Number.isInteger(parseInt(userZIP))) {
			return true;
		} else {
			return false;
		}
	};

	const callCurrentWeather = (ZIP) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${ZIP},us&units=imperial&APPID=${apiKey}`)
			.done(data => resolve(data))
			.fail(error => reject(error));
		});
	};

	const callForecast = (ZIP) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${ZIP},us&cnt=7&units=imperial&APPID=${apiKey}`)
			.done(data => resolve(data))
			.fail(error => reject(error));
		});
	};

	const displayCurrentWeather = (data) => {
		currentWeather = data[0];
		threeDayForecast = data[1].list.slice(0, 3);
		sevenDayForecast = data[1].list;
		let today = moment.unix(currentWeather.dt);
		console.log(today);
		$("#options-display").html(`<div class="col-md-4 col-md-offset-4" id="weather-selection"><div class="btn-group btn-group-justified" role="group"><div class="btn-group" role="group"><button type="button" class="btn btn-default weather-option active">Today's Weather</button></div><div class="btn-group" role="group"><button type="button" class="btn btn-default weather-option">3-Day Forecast</button></div><div class="btn-group" role="group"><button type="button" class="btn btn-default weather-option">7-Day Forecast</button></div></div></div>`);
		$("#weather-display").html(`<div class="col-md-4 col-md-offset-4"><div class="panel panel-default">
  			<div class="panel-heading">
    			<h3 class="panel-title">Today - ${today.format("dddd, MMMM Do")}</h3>
  			</div>
  			<div class="panel-body">
    			<h5>Temperature</h5>
    			<h5>Conditions</h5>
    			<h5>Air Pressure</h5>
    			<h5>Wind Speed</h5>
  			</div>
			</div></div`);
		console.log(currentWeather, threeDayForecast, sevenDayForecast);
	};


//<img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png">

});