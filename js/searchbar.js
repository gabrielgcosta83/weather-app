function toggleSearchBar() {
    var buttonContainer = document.querySelector(".button__container");
    var inputText = document.querySelector(".input__text");
    var locationContainer = document.querySelector(".location__container");
    var closeIcon = document.querySelector(".close_icon");
    
    buttonContainer.classList.toggle("search");
    inputText.classList.toggle("hide");
    locationContainer.classList.toggle("hide");
    closeIcon.classList.toggle("hide");
}

let searchForm = document.querySelector(".search__form");

searchForm.addEventListener("submit", function (e) {
    e.preventDefault() // This prevents the window from reloading
    
    // traz a info do input text
    let formdata = new FormData(this);
    let location = formdata.get("input__text");

    // chama funcao para setar o tempo
    if (!location == "") {setWeatherInfo(location);} else setErrormsg("Digite uma cidade");

    // Recolhe a search bar
    if (document.querySelector(".location__container").classList.contains("hide")) { toggleSearchBar(); } 
});

function setErrormsg(msg) {
    var errormsgElement = document.querySelector(".errormsg");
    errormsgElement.innerHTML = msg;
    errormsgElement.className += " errormsg__active"
    setTimeout(() => {
        errormsgElement.className = "errormsg"
        
      }, 5000);
    setTimeout(() => { errormsgElement.innerHTML = ""    },10000);
}

