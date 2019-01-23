const yargs = require('yargs');
const express= require('express');
const fs=require('fs');
const ejs=require('ejs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
app.set('view engine',"ejs");
app.use('/',express.static('assets'));

var app=express();

const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    // var file=fs.createReadStream(__dirname+"/index.html","utf8");
    // file.pipe(res);
    res.render('index');
});

app.get("/data",(req,res)=>{
    var address=req.query.address;
    // console.log(address);
    geocode.geocodeAddress(address, (errorMessage, results) => {
        if(errorMessage) {
            var text = 'Unable to find the address';
            res.render('data',{text});
        }
        else{
            // console.log(results.address);
            weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                if(errorMessage){
                    console.log(errorMessage);   
                }
                else{
                    var text='Location : '+ results.address+`\nIt's currently ${weatherResults.temperature} ℉ . \nIt feels like ${weatherResults.apparentTemperature} ℉.`;
                    res.render('data',{text});
                }
                });
        }
    });
});
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });

// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetech weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

    //console.log(argv);
    

