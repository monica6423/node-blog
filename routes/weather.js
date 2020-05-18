const express = require('express');
const router = express.Router();
const https = require("https");

router.get("/", function (req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=taipei&appid=171d4e370a8f68e56ad1a13eb0e86126&units=metric"
    https.get(url, function (response) {

        response.on("data", function (data) {

            //turn the hex to javascript object
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            //console.log(weatherDescription);
            res.render('weather');

        })
    })

})

module.exports = router;