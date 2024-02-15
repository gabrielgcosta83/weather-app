var checkbox = document.querySelector("input[name=scale]");

checkbox.addEventListener('change', function() {
  // Muda temperatura principal  
  var temp = document.getElementById("temp").innerHTML
  var tempScale; 
  if (selectedScaleF()) {
    //Temperatura princial    
    temp = Math.round((temp*(9/5))+32);
    tempScale = "&degF"
    changeForecastTemp(tempScale);

  } else { 
    temp = Math.round((temp-32)*(5/9));
    tempScale= "&degC";
    changeForecastTemp(tempScale);
  }

  document.getElementById("temp").innerHTML = temp;
  document.getElementById("tempScale").innerHTML = tempScale;

});

function selectedScaleF() {
    var scaleCheckbox = document.querySelector("input[name=scale]");
    if (scaleCheckbox.checked) {
        return true; // Fahrenheit
    } else {
        return false; // Celsius
    }
}

function changeForecastTemp(tempScale) {
  for (i = 0; i < 4; i++) {
    var forecastTempElement = document.getElementById("forecastTemp" + i);
    var forecastTemp = forecastTempElement.innerHTML;
    forecastTemp = forecastTemp.match(/(\d+)/)[0]; // extrai somente o numero
      if (tempScale == "&degF") { forecastTemp = Math.round((forecastTemp*(9/5))+32); }
      else { forecastTemp = Math.round((forecastTemp-32)*(5/9)); }
    forecastTempElement.innerHTML = forecastTemp + tempScale;
  }
}
