const Order = require("../models/Order");

exports.createOrderService = async (data, session) => {
  const order = await Order.create(data, session);
  return order;
};

exports.getAllOrder = async (condition, isAdmin) => {
  // base query
  let q = Order.find(condition).populate([
    {
      path: "orderItems",
      select: "_id",
      // populate: {
      //   path: "productId",
      //   select: "name unit",
      // },
    },
    {
      path: "customerId",
      select: "name phone",
    },
  ]); // queries could hold limit/skip/sort

  // add population only for privileged roles
  // if (isAdmin) {
  //   q = q.populate({
  //     path: "userId",
  //     select: "firstName lastName email", // show just these fields
  //   });
  // }
  const orders = q.exec();
  // const orders = await Order.find(condition).popultae({
  //   path: "userId",
  //   select: "firstName lastName email",
  // });
  return orders;
};

exports.orderUpdateByIdService = async (id, data) => {
  const order = await Order.findByIdAndUpdate({ _id: id }, data, {
    runValidators: true,
  });
  return order;
};

exports.getOrderSerive = async (id) => {
  const order = await Order.findById(id).populate([
    {
      path: "orderItems",
      select: "-__v",
      populate: {
        path: "productId",
        select: "name unit",
      },
    },
  ]);
  return order;
};

exports.deleteOrderService = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order;
};
