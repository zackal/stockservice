const StockService = require("../services/stock.service");

exports.getStock = async function(req, res) {
  res.json({ status: "success", ticker: StockService.getStock()});
};

exports.addStock = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  StockService.addStock(req.body);
  res.json({ status: "success", ticker: req.body });
};
