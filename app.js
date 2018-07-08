const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('node-schedule');
const notification = require('./server/services/notification');

const search = require('./server/helpers/crypto-search/search');


// const btc = search.nameToSymbols('BTC')
// console.log(btc);
// console.log(search.symbolToNames('Btc'));

console.log(search.searchName("bit"))
// console.log(search.searchSymbol("bit"))

//Send email notification to user at 8am every day
var j = schedule.scheduleJob('0 0 8 * * *', function(){
  console.log("sent email")
  notification.pushNotification();
});

console.log(Date.now())

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;