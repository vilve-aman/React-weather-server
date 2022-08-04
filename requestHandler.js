import fetch from 'node-fetch';
import fs from 'fs'

// const getOpenweather = async (obj)=>{
//     let apikey1 = `9092da71fbc7883ee2e59cfab559aa44`
//     let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${obj.location}&appid=${apikey1}`;
//     const response = await fetch(url1);
//     const d = await response.json();
//     console.log(d)
// }

const handleQuery = async (obj,callback) =>{

    let resObject={}
    //openweather map api handling for current data ----------------------------------------------------------------------------------------------

    let apikey1 = `9092da71fbc7883ee2e59cfab559aa44`
    let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${obj.location}&appid=${apikey1}`;
    const response = await fetch(url1);
    const d = await response.json();

    // resObject['OpenWeather'] = d['main']
    resObject['OpenWeather'] = d


    // console.log(d.coord)
    const lon = await d.coord.lon 
    const lat = await d.coord.lat
    // console.log(lon,lat)

    // weatherbit api handling for forecast----------------------------------------------------------------------------------------------------------

    let apikey2 = `e4feb7fa73f54e03a160178e9f1fb4a8`    
    let url2= `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apikey2}`;
    const response2 = await fetch(url2);
    const d2 = await response2.json();

    let t={}
    let weatherbit = []
    let w =[]
    for(let i=1 ; i<7 ; i++){
        t={}
        t['key'] = i
        t['datetime'] = d2.data[i]['datetime']
        t['app_max_temp'] = d2.data[i]['app_max_temp']
        t['app_min_temp'] = d2.data[i]['app_min_temp']

        w.push(t)

    }
    weatherbit.push(w)
    resObject['weatherbit'] = weatherbit
    // resObject['weatherbit'] = d2


    //--------------------------------------------------------------------------------------------------------------------------------------------------

    let r=JSON.stringify(resObject)


    callback(r)

}


export default handleQuery;