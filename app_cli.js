const request = require('request');

let apiKey = '2981e5d666f5266a1c5502827004c1d6';
let city = process.argv[2];
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

request(url, function (err, response, body) {
  if (err) {
    console.log('error:', err);
  } else {
    let weather = JSON.parse(body);
    console.log('body:', weather);
    console.log(`It's ${weather.main.temp} degrees C in ${city} right now!`);
  }
});

