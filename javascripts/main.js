$(function() {

	const apiKey = "";
	let currentWeather = {};
	let threeDayForecast = {};
	let sevenDayForecast = {};

	$("#zip-input").keyup(e => {
		if (e.key === "Enter") {
			loadRequestedWeather();
		}
	});
	$("#submit-button").click(() => {
			loadRequestedWeather();
	});

	const loadRequestedWeather = () => {
		let userZIP = $("#zip-input").val();
		if (validateZIP(userZIP)) {
			Promise.all([callCurrentWeather(userZIP), callForecast(userZIP)])
			.then(data => resolveData(data))
			.catch(error => (console.log("Error in promise.all", error)));
		} else {
			$("#options-display").html(`<div class="col-md-4 col-md-offset-4 alert alert-danger text-center alert-box"><h3>Hmm, something went wrong.<br>Please enter a valid 5-digit ZIP Code</h3></div>`);
			$("#weather-display").html("");
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
			$.ajax(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${ZIP},us&cnt=8&units=imperial&APPID=${apiKey}`)
			.done(data => resolve(data))
			.fail(error => reject(error));
		});
	};

	const resolveData = (data) => {
		currentWeather = data[0];
		threeDayForecast = data[1].list.slice(1, 4);
		sevenDayForecast = data[1].list.slice(1);
		$("#options-display").html(`<div class="col-md-4 col-md-offset-4" id="weather-selection"><div class="btn-group btn-group-justified" role="group"><div class="btn-group" role="group"><button type="button" class="btn btn-default weather-option active" id="today">Today's Weather</button></div><div class="btn-group" role="group"><button type="button" class="btn btn-default weather-option" id="3-day">3-Day Forecast</button></div><div class="btn-group" role="group"><button type="button" class="btn btn-default weather-option" id="7-day">7-Day Forecast</button></div></div></div>`);
		console.log(currentWeather, threeDayForecast, sevenDayForecast);
		$("#weather-display").html(displayWeather());
	};

	const displayWeather = (optionalForecast) => {
		let ts = ""; //tableString
		ts += `<div class="col-md-6 col-md-offset-3"><table class="table forecastTable">`;
		ts += `<tr><th>Date</th><th>Conditions</th><th>High</th><th>Low</th><th>Air Pressure</th><th>Wind Speed</th></tr>`;
		ts += `<tr><td>${moment.unix(currentWeather.dt).format("dddd, MMMM Do")}</td><td>${currentWeather.weather[0].main}</td><td>${Math.round(currentWeather.main.temp_max)}&#176;F</td><td>${Math.round(currentWeather.main.temp_min)}&#176;F</td><td>${currentWeather.main.pressure} hPa</td><td>${currentWeather.wind.speed} MPH</td></tr>`;
		if (optionalForecast === "threeDayForecast") {
			forecastString = threeDayForecast.map((forecast) => { //this is broken, probably need a different approach
				let thisRow = "";
				thisRow += `<tr><td>${moment.unix(forecast.dt).format("dddd, MMMM Do")}</td><td>${forecast.weather[0].main}</td><td>${Math.round(forecast.temp.max)}&#176;F</td><td>${Math.round(forecast.temp.min)}&#176;F</td><td>${forecast.pressure} hPa</td><td>${forecast.speed} MPH</td></tr>`;
				return thisRow;
			});
			ts += forecastString.reduce((final, each) => {
				return final + each;
			});
		}
		if (optionalForecast === "sevenDayForecast") {
			forecastString = sevenDayForecast.map((forecast) => { //this is broken, probably need a different approach
				let thisRow = "";
				thisRow += `<tr><td>${moment.unix(forecast.dt).format("dddd, MMMM Do")}</td><td>${forecast.weather[0].main}</td><td>${Math.round(forecast.temp.max)}&#176;F</td><td>${Math.round(forecast.temp.min)}&#176;F</td><td>${forecast.pressure} hPa</td><td>${forecast.speed} MPH</td></tr>`;
				return thisRow;
			});
			ts += forecastString.reduce((final, each) => {
				return final + each;
			});
		}
		ts += `</table></div>`;
		return ts;
	};

	const setActiveButton = (activeID) => {
		$("#today, #3-day, #7-day").removeClass("active");
		$(activeID).addClass("active");
	};

	$("#options-display").on("click", "#3-day", () => {
		$("#weather-display").html(displayWeather("threeDayForecast"));
		setActiveButton("#3-day");
	});

	$("#options-display").on("click", "#7-day", () => {
		$("#weather-display").html(displayWeather("sevenDayForecast"));
		setActiveButton("#7-day");
	});

	$("#options-display").on("click", "#today", () => {
		$("#weather-display").html(displayWeather());
		setActiveButton("#today");
	});


//<img src="http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png">

		// $("#weather-display").html(`<div class="col-md-2 col-md-offset-5"><div class="panel panel-default">
  // 			<div class="panel-heading">
  //   			<h3 class="panel-title">Today - ${today.format("dddd, MMMM Do")}</h3>
  // 			</div>
  // 			<div class="panel-body">
  //   			<h5>Temperature - ${currentWeather.main.temp_max}</h5>
  //   			<h5>Conditions</h5>
  //   			<h5>Air Pressure</h5>
  //   			<h5>Wind Speed</h5>
  // 			</div>
		// 	</div></div`);

});