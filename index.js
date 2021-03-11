//basic design layout in html (look into materialize framework)
//  one location for the input text
//  one location for the result of the search
//  one location for the picture of the city that is searched.
//establish api connection through fetch and check if information is received.
//      for the weather data I will use open weather api
//      for the city image 


var weather_key =config.weatherApi_key;
var picture_key =config.pictureApi_key;

document.getElementById('test');
let cityText = document.getElementById('response');
let cityQuery = document.getElementById('query');


document.getElementById('request').addEventListener('click',getExternalData);

function getExternalData(){
    let cityInput = document.getElementById('cityName').value;
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${weather_key}`)
    .then(function(response){
        return response.json()})
    .then(function(data){
        console.log(data)
        cityText.innerHTML=data.name;
        cityQuery.innerHTML=Math.round(parseFloat(data.main.temp)-273.15) ; 
    });

    fetch(`https://api.pexels.com/v1/search?query=${cityInput}`,{
        headers: {
            Authorization: picture_key
        }
    })
    .then(function(response){
        return response.json()})
    .then(function(data){
        console.log(data)
         ; 
    });
}




    // import { createClient } from 'pexels';

    // const client = createClient('YOUR_API_KEY');
    // const query = 'Nature';
    
    // client.photos.search({ query, per_page: 1 }).then(photos => {...});
