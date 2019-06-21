const moment = require("moment");
const record = require("../utils/record");

exports.getStock = function() {
  let result = [];
  if (recordQueue.peek()) {
    while (recordQueue.peek()) {
      // remove expired timeslots in the queue
      let firstInQueueTime = moment(
        recordQueue.peek().getTimestamp(),
        "YYYY-MM-DD HH-mm"
      );
      let currentTime = moment(
        moment().format("YYYY-MM-DD HH-mm"),
        "YYYY-MM-DD HH-mm"
      );
      let diffInMins = currentTime.diff(firstInQueueTime, "minutes");
      if (diffInMins > 10) {
        recordQueue.dequeue();
      } else {
        break;
      }
    }

    // consolidate final result
    let masterRecord = recordQueue.reduce();
    console.log(masterRecord);
    masterRecord.getFreqFive().forEach(data => {
      let [ticker, counter] = data;
      result.push(`${ticker} (${counter})`);
    });
  }

  return result;
};

exports.addStock = function(stockData) {
  currentTimestamp = moment().format("YYYY-MM-DD HH-mm");
  if (recordQueue.getLast() && recordQueue.getLast().getTimestamp() === currentTimestamp) {
    // check if any matching timeslot in the queue
    recordQueue.getLast().addCounter(stockData);
  } else {
    // nothing in queue, so create a new record and insert into the queue
    let stockRecord = new record();
    stockRecord.setTimestamp(currentTimestamp);
    stockRecord.addCounter(stockData);
    recordQueue.enqueue(stockRecord);
  }
};
