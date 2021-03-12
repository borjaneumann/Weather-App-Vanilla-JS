//basic design layout in html (look into materialize framework)
//  one location for the input text
//  one location for the result of the search
//  one location for the picture of the city that is searched.
//establish api connection through fetch and check if information is received.
//      Weather data from Open Weather API
//      Image data from Pexels API


var weather_key =config.weatherApi_key;
var picture_key =config.pictureApi_key;

document.getElementById('request').addEventListener('click',getExternalData);

function getExternalData(){
    let cityInput = document.getElementById('cityName').value;
    let cityImage = document.getElementById('cityImage');
    let temp = document.getElementById('temp');
    let tempFeel = document.getElementById('tempFeel');
    let tempMin = document.getElementById('tempMin');
    let tempMax = document.getElementById('tempMax');
    let pressure = document.getElementById('pressure');
    let humidity = document.getElementById('humidity');
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${weather_key}&units=metric`)
    .then(function(response){
        return response.json()})
    .then(function(data){
        console.log(data)
        temp.innerHTML=Math.round(data.main.temp)+"°C" ;
        tempFeel.innerHTML=Math.round(data.main.feels_like)+"°C";
        tempMin.innerHTML=Math.round(data.main.temp_min)+"°C";
        tempMax.innerHTML= Math.round(data.main.temp_max)+"°C";
        pressure.innerHTML=data.main.pressure+"hPa";
        humidity.innerHTML=data.main.humidity+"%";
    })
    .catch(err=>M.toast({html: 'mmm...maybe a typo or the city name doesn\'t exist by our data base!'}))

    fetch(`https://api.pexels.com/v1/search?query=${cityInput}`,{
        headers: {
            Authorization: picture_key
        }
    })
    .then(function(response){
        return response.json()})
    .then(function(data){
        console.log(data);
        if (cityInput=="Yokohama"||cityInput=="yokohama"){
            cityImage.src=data.photos[2].src.landscape;
        }else{
            cityImage.src=data.photos[0].src.landscape;
        }
    })
    .catch(err=>M.toast({html: 'mmm...something went wrong!'}))

}




