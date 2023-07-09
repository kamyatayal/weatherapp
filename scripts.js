const apiKey= "cf812a4e2eccf2a37464659888605104";
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
let todayDate = new Date();

async function checkWeather(city){
    const response=await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data= await response.json();
        console.log(data);
        document.querySelector(".date").innerHTML=todayDate.getDate()+"/"+((todayDate.getMonth())+1)+"/"+todayDate.getFullYear();
        document.querySelector(".updated-on").innerHTML="Updated as of "+todayDate.getHours()+":"+todayDate.getMinutes();
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
        document.querySelector(".min-temp").innerHTML=Math.round(data.main.temp_min)+"°C"+"(min)"+" |";
        document.querySelector(".max-temp").innerHTML=Math.round(data.main.temp_max)+"°C"+"(max)";
        document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
        document.querySelector(".pressure").innerHTML=data.main.pressure + "mb";
        document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";
       
    
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.jpg";
            document.body.style.backgroundImage = 'url(img/cloudsbg.jpg)';
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.jpg";
            document.body.style.backgroundImage = 'url(img/rainy.jpg)';
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.jpg";
            document.body.style.backgroundImage = 'url(img/clearbg.jpg)';
        }
        else if (data.weather[0].main== "Snow") {
            weatherIcon.src = "img/snow.jpg";
            document.body.style.backgroundImage = 'url(img/snowbg.jpg)';
        }
        else if (data.weather[0].main == "Sunny") {
            weatherIcon.src = "img/clear.jpg";
            document.body.style.backgroundImage = 'url(img/sunnybg.jpg)';
        } 
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.jpg";
            document.body.style.backgroundImage = 'url(img/drizzlebg.jpg)';
        } 
        else if (data.weather[0].main == "Mist" || data.weather[0].main === 'Haze' || data.weather[0].main === 'Fog') {
            weatherIcon.src = "img/mist.jpg";
            document.body.style.backgroundImage = 'url(img/mistbg.jpg)';
        }
        else {
            document.body.style.backgroundImage = 'url(img/bg.jpg)';
        } 
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }

}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (event) => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      document.querySelector(".search button").click();
    }
  });
  
