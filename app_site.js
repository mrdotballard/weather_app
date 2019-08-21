const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null });
});

app.post('/', function (req, res) {
  let apiKey = '2981e5d666f5266a1c5502827004c1d6';
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'Error requesting URL' });
    } else {
      console.log(body);
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', { weather: null, error: 'Error, please try again' });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees C in ${weather.name}.`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



