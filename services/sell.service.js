const Sell = require("../models/Sell");

exports.getSellsService = async () => {
  const sells = Sell.find({});
  return sells;
};

exports.createSellService = async (data, session) => {
  const sell = await Sell.create(data, session);
  return sell;
};
