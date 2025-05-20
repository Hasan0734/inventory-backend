const OrderItem = require("../models/OrderItem");

exports.createOrderItemService = async (data, session) => {
  const items = await OrderItem.insertMany(data, { session });
  return items;
};

exports.getOrderItemsService = async () => {
  const selles = OrderItem.find({});
  s;
  return selles;
};

exports.orderItemUpdateService = async (id, data) => {
  const order = await OrderItem.findByIdAndUpdate({ _id: id }, data, {
    runValidators: true,
  });
  return order;
};

exports.getOrderItemsService = async (id) => {
  const order = await OrderItem.findById(id);
  return order;
};

exports.deleteOrderItemService = async (id) => {
  const order = await OrderItem.findByIdAndDelete(id);
  return order;
};
