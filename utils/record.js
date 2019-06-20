module.exports = class Record {
  constructor() {
    this.timestamp = null;
    this.dataMap = new Map();
    this.freqLimit = 5;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

  getTimestamp() {
    return this.timestamp;
  }

  addCounter(item, count = null) {
    if (this.dataMap.get(item.symbol.toUpperCase())) {
      //if existing timeslot key pair found add 1
      this.dataMap.set(
        item.symbol.toUpperCase(),
        count ? this.dataMap.get(item.symbol.toUpperCase()) + count : this.dataMap.get(item.symbol.toUpperCase()) + 1
      );
    } else {
      //if timeslot not found create and set to 1
      count ? this.dataMap.set(item.symbol.toUpperCase(), count) : this.dataMap.set(item.symbol.toUpperCase(), 1);
    }
  }

  getFreqFive() {
      //sort map by descending order and return 5
      if(this.dataMap.entries()){
        let sortedArr = [...this.dataMap.entries()].sort((a, b) => b[1] - a[1]);
        return sortedArr.slice(0,this.freqLimit);
      }else{
        return null;
      }
    
  }
};
