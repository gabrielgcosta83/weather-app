function startTime() {
    // hora
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    // Data
    let day = today.getDate();
    let weekday = today.getDay();
    let month = today.getMonth();
    let year = today.getFullYear();
    var weekdaynamept = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira", "Quinta-feira", "Sexta-feira","Sábado"];
    var monthnamept = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    // Insere dados no HTML
    document.getElementById("date").innerHTML = day + " de " + monthnamept[month] + " de " + year
    document.getElementById("clock").innerHTML = weekdaynamept[weekday] + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +  h + ":" + m + ":" + s;;

    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }