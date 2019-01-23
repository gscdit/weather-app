const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/871a4ab19f8e1984f29863731d87cdb5/${lat},${lng}`,
        json: true
     },(error,response,body) => {
         if(error){
             callback('Unable to connect to Forecast.io srver.');
         } else if(response.statusCode === 400){
             callback('Unable to fetech weather.');
         }else if(response.statusCode === 200){
             callback(undefined, {
                 temperature: body.currently.temperature,
                 apparentTemperature: body.currently.apparentTemperature
             });
         }   
     });
};

module.exports.getWeather = getWeather;
