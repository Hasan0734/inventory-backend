const SellItem = require("../models/SellItem");

exports.createSellItemService = async (data, session) => {
  const order = await SellItem.insertMany(data, { session });
  return order;
};

exports.getSellsItemService = async () => {
  const sellItems = SellItem.find({});
  s;
  return sellItems;
};

exports.getSellItemService = async (id) => {
  const order = await SellItem.findById(id);
  return order;
};

exports.orderUpdateService = async (id, data) => {
  const order = await SellItem.findByIdAndUpdate({ _id: id }, data, {
    runValidators: true,
  });
  return order;
};

exports.deleteOrderService = async (id) => {
  const order = await SellItem.findByIdAndDelete(id);
  return order;
};
