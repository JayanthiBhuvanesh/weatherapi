const request = require('supertest');
var expect = require('mocha').expect;
const init = require("../data/initdata.json");
const weatherforecast = require("../data/weatherforecast.json");
const api = require("../apikey.json")
//Hourly weather forecast test suite
describe('Check weather forecast ', function () {
    it('response with 200 created', async (done) => {
    request(init.forecastapp)
    .get('?&postal_code='+weatherforecast.forecast.postal_code+'&country='+weatherforecast.forecast.country+'&key='+api.key+'&hours='+weatherforecast.forecast.hours)
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .then(res => {
    console.log("Timestamp_utc:"+ res.body.data[0].timestamp_utc);
    for (element in res.body.data)
    {   
    console.log("icon: "+res.body.data[element].weather.icon +" code: "+res.body.data[element].weather.code +" description: "+res.body.data[element].weather.description);
    }
    })
    done();   
    });
});