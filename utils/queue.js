const record = require("./record");

module.exports = class Queue {
  constructor() {
    this.data = [];
  }

  appendLast(item) {
    this.data[0] = item;
  }

  getLast() {
    return this.data[0];
  }

  enqueue(item) {
    this.data.unshift(item);
  }

  dequeue() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  // consolidate records for view api
  reduce() {
    let masterRecord = new record();
    for (let i = 0; i < this.data.length; i++) {
      let fiveFreq = this.data[i].getFreqFive();
      if (fiveFreq) {
        for (let j = 0; j < fiveFreq.length; j++) {
          let [symbol, counter] = fiveFreq[j];
          masterRecord.addCounter({ symbol }, counter);
        }
      }
    }
    return masterRecord;
  }
};
