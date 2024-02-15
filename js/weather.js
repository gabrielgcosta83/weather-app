const apiKey = "97163b59d2333be7bf93a5632b60ac55"

// Fazer funcao para buscar a localizacao inicial

// Busca a localizacao, chama funcao para info do tempo e retorna
function setWeatherInfo(city) {

  // define link baseado na cidade
  let geocodingBaseApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=';
  let limit = 1;
  let geocodingApiUrl = geocodingBaseApiUrl + city + "&limit=" + limit + "&appid=" + apiKey;
  
  // 
  return fetch(geocodingApiUrl)
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Data not found');
      } else if (response.status === 500) {
        throw new Error('Server error');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    return response.json();
  })


  // busca localizacao da cidade e chama funcao setar o clima 
  .then(data => {
    var geoInfo = data;
    if (!geoInfo.length == 0) {
      console.log(geoInfo);
      var lat = geoInfo[0].lat;
      var lon = geoInfo[0].lon;
      var country = geoInfo[0].country;
      let countryNames = new Intl.DisplayNames(['pt-br'], {type: "region"});
      country = countryNames.of(country);
      setWeather(lat, lon, city, country);
    } else {
      setErrormsg("Cidade nao encontrada")
    }
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
 


function setWeather(lat,lon,city,country) {
    let weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + "&units=metric";
    return fetch(weatherApiUrl)
        .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
            throw new Error('Data not found');
            } else if (response.status === 500) {
            throw new Error('Server error');
            } else {
            throw new Error('Network response was not ok');
            }
        }
        return response.json();
        })
        .then(data => {
          var weatherInfo = data;
          
          //temp
          if (selectedScaleF()) {
            var temp = Math.round((weatherInfo.main.temp*(9/5))+32);
            document.getElementById("tempScale").innerHTML = "&degF";
          } else {
            var temp = Math.round(weatherInfo.main.temp);
            document.getElementById("tempScale").innerHTML = "&degC";
          }

          var icon = weatherInfo.weather[0].icon;          
          var wind = Math.round(weatherInfo.wind.speed * 1.944);
          var wind_dir = degToCardinals(Math.round(weatherInfo.wind.deg));
          var humidity = weatherInfo.main.humidity;
          var rain = weatherInfo.rain;
          if (rain == null) {rain = 0} else {var rain = rain["1h"];};
          
          var weatherIconElement = document.querySelector(".now__weather_bigIcon");
          updateIcon(icon,weatherIconElement);
          document.getElementById("temp").innerHTML = temp;
          document.getElementById("location").innerHTML = city + ", " + country;
          document.getElementById("wind").innerHTML = "&nbsp" + wind + " kts. " + wind_dir;
          document.getElementById("humidity").innerHTML = "&nbsp" + humidity + "%"; 
          document.getElementById("rain").innerHTML = "&nbsp" + rain + " mm"; 

          var timezone = weatherInfo.timezone;
          setWeatherForecast(lat,lon,timezone);


        })

        .catch(error => {
        console.error('Error:', error);
        });
} 

function setWeatherForecast(lat,lon,timezone) {
  let forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + "&units=metric";
    return fetch(forecastApiUrl)
        .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
            throw new Error('Data not found');
            } else if (response.status === 500) {
            throw new Error('Server error');
            } else {
            throw new Error('Network response was not ok');
            }
        }
        return response.json();
        })
        .then(data => {
          var forecastInfo = data; //Info com os dados do forecast
          var hourForecastList = forecastInfo.list; //lista com forecast hora a hora
          var noon = (Math.floor((12 - (timezone/3600))/3))*3; // horario UTC mais proximo do meio dia local

          var dayForecastList = []; // cria variavel que armazena dados do tempo de cada dia no horario mais proximo ao meio dia
          
          // Cria dayforecastList buscando hora noon do hourForcastList 
          var j = 0;
          for (i = 0; i < hourForecastList.length ; i++) {
            if (hourForecastList[i].dt_txt.includes(noon + ":00:00")) {
              dayForecastList[j] = hourForecastList[i];
              j++;
            };
          }

          console.log(dayForecastList);
          // Ajusta dados de cada Card
          for (i = 0 ; i < 4 ; i++) {
            // Data
            const date = new Date(dayForecastList[i].dt_txt);
            const weekday = date.getDay();
            const weekdaynamept = ["Dom","Seg","Ter","Qua", "Qui", "Sex","Sáb"];
            const weekdayElement = document.getElementById("forecastWeekDay" + i);
            weekdayElement.innerHTML = weekdaynamept[weekday];

            //Temperatura
            const tempForecastElement = document.getElementById("forecastTemp" + i);
            if (selectedScaleF()) {
              var temp = Math.round((dayForecastList[i].main.temp*(9/5))+32);
              tempForecastElement.innerHTML = temp + "&degF";
            } else {
              var temp = Math.round(dayForecastList[i].main.temp);
              tempForecastElement.innerHTML = temp + "&degC";
            }
                        
            //Icone
            const icon = dayForecastList[i].weather[0].icon;
            const iconForecastElement = document.getElementById("forecastIcon" + i);
            updateIcon(icon,iconForecastElement);
          }
         })

        .catch(error => {
        console.error('Error:', error);
        });
  
}

// Conversao para pontos cardeais
function degToCardinals(deg) {
  var cardinal;
  if ( deg >= 338 || deg < 23) { cardinal = "N"};
  if ( deg >=  23 && deg < 68) { cardinal = "NE"};
  if ( deg >=  68 && deg < 115) { cardinal = "E"};
  if ( deg >=  115 && deg < 158) { cardinal = "SE"};
  if ( deg >=  158 && deg < 203) { cardinal = "S"};
  if ( deg >=  203 && deg < 248) { cardinal = "SO"};
  if ( deg >=  248 && deg < 293) { cardinal = "O"};
  if ( deg >=  293 && deg < 338) { cardinal = "NO"};
  return cardinal;
}

function updateIcon(icon,element) {
  if (icon == "04d") { icon = "03d"; }
  if (icon == "04n") { icon = "03n"; }
  //images 4 usam o 3
  var url = "/weatherapp/imgs/weather/" + icon + ".png";
  element.src = url;
}