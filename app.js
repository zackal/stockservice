/* 
Assumptions/Consideration
1. API insertion time is used as timestamp assuming the stock timestamp is equal to insertion time
2. Get stock service will remove timeslots in queue that are older than 10mins to reduce memory footprint
3. Processing time can complete within 1 min interval
4. Assume all incoming JSONs are formatted properly
5. Less than 100,000 item per 1 min queue - ... spread operator upper limit. Larger data will require redis/database
6. Spillover edge case some records may process microseconds before the next timeslot and end 1 timeslot after
*/

const express = require("express");
const bodyParser = require("body-parser");

const StockController = require('./controllers/stock.controller')
const queue = require("./utils/queue");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//global queue
global.recordQueue = new queue();

//api to get most frequent 5 tickers from past 10 mins
app.get("/stock", StockController.getStock);
//api to insert new stock record
app.post("/stock", StockController.addStock);

app.listen(port, () => console.log(`Stock Service listening on port ${port}!`));
