const request = require('supertest');
const init = require("../data/initdata.json");
const currentweather = require("../data/currentweatherupdate.json");
const api = require("../apikey.json")
//Current weather forecast test suite
describe('Check current weather', function () {
    console.log("Latitude:"+ currentweather.weather.lat);
    console.log("Longitude:" + currentweather.weather.lon);
    console.log("Endpoint:"+ init.app);
    //Returns statecode from currentweather api
    it('response with 200 created', async (done) => {
    request(init.app)
    .get('?&lat='+currentweather.weather.lat+'&lon='+currentweather.weather.lon+'&key='+api.key)
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .then(res => {
    console.log("State Code:"+ res.body.data[0].state_code);
    })
    done();   
    });

   //Validating wrong API Key 
   it('Wrong api key validation', async (done)=>{
   request(init.app)
   .get('?&lat='+currentweather.weather.lat+'&lon='+currentweather.weather.lon+'&key='+api.badkey)
   .expect(403)
   .end(function(err, res) {
   if(err) {
   console.log(err);
   done();
   }
   });
   done();
   });
});
