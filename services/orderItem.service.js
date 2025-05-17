const OrderItem = require("../models/OrderItem");

exports.createOrderItemService = async (data, session) => {
  const order = await OrderItem.insertMany(data, { session });
  return order;
};

exports.getAllOrder = async () => {
  const categories = OrderItem.find({});
  s;
  return categories;
};

exports.orderUpdateByIdService = async (id, data) => {
  const order = await OrderItem.findByIdAndUpdate({ _id: id }, data, {
    runValidators: true,
  });
  return order;
};

exports.getOrderSerive = async (id) => {
  const order = await OrderItem.findById(id);
  return order;
};

exports.deleteOrderService = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order;
};
