const cron = require('node-cron')
const express = require('express')

var app = express();
var PORT = 3000;


var sensorData = {
    temperature: 0,
    humidity: 0,
}

var status = 'STOP' // START / STOP

var defaultCron = '* * * * *' // Run's once every minute

var task = cron.schedule(defaultCron, () => {})

function init(temperature, humidity) {
    console.log('Initializing...')
    sensorData = {
        temperature: temperature,
        humidity: humidity,
    }
}

function start() {
    console.log('Starting...')
    status = 'START'
    task = cron.schedule(defaultCron, () => {
        console.log('Running...')
        randomTemeperature = Math.floor(20 + Math.random() * 40) // 20 - 60 degree Celcius
        randomHumidity = Math.floor(5 + Math.random() * 90) // 5 - 95 RH
        
        sensorData = {
            temperature: randomTemeperature,
            humidity: randomHumidity,
        }
        
        console.log(sensorData)
    })
}

function stop() {
    console.log('Stopping...')
    status = 'STOP'
    task.stop();
    console.log("Stopped")
}

function setFrequency(newCron) {
    console.log('Setting frequency...')
    stop()
    defaultCron = newCron
    start()
}

app.get("/start", start);
app.get("/stop", stop);
app.get("/status", function(req, res) {
    res.send(status);
})
app.get("/data", function(req, res) {
    res.send(sensorData);
})

app.listen(PORT)