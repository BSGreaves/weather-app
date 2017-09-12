How's the Weather?
=========

A simple weather app that returns today's weather, with an option to see the 3-day or 7-day forecast

------
![Project Image](https://user-images.githubusercontent.com/25022285/30303057-fbde647a-972a-11e7-881a-e114259d29a2.png)

Project Goals
-----
The app uses the Open Weather API to call local weather using a validated ZIP code. All dynamic components are written in Jquery.
I got the chance to practice lots of skills - working with APIs, ES6 syntax, Jquery, compiling SASS with Grunt, and using MomentJS for dates. I wanted to provide a really clean UI with nothing but a pretty backsplash.

Technologies
------------
Jquery, MomentJS, HTTP calls (tested with Postman), Open Weather API, SASS, Grunt

Features
------------


 - Input your ZIP Code and hit "Submit"
 - Returns today's weather
 - Select the 3-day or 7-day forecast for a look at what's ahead

Checking it out
---------------------------------

 1. You should have [NPM](https://www.npmjs.com/) installed
 2. Clone this repo to a local directory. `cd` into the directory and run `npm install`
 3. To run it locally, you will need an API key from [OpenWeather](https://openweathermap.org/).
 4. Find the go to `javascripts/main.js` and drop your API key into line 3: `const apiKey = "YourAPIKey";`
 5. Run the project with hs -c-1 in the terminal and go to the suggested URL (for instance, `http://localhost:8080/`)
