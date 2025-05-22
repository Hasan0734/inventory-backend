const mongoose = require("mongoose");
const {
  createOrderService,
  getAllOrder,
  orderUpdateByIdService,
  getOrderSerive,
  deleteOrderService,
} = require("../services/order.service");

const { getProductService } = require("../services/product.service");
const { createOrderItemService } = require("../services/orderItem.service");
const { stockQuantityIncrease } = require("../services/stock.service");

exports.createOrder = async (req, res) => {
  const { shippingAddress, items, customerId, sellerName } = req.body;
  const userId = req.user._id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //calculate total
    let totalAmount = 0;
    const orderItemsData = [];

    for (let item of items) {
      const product = await getProductService(item.productId);
      if (!product) throw new Error("Product not found");

      const ok = await stockQuantityIncrease(
        item.productId,
        item.quantity,
        session
      );
     
      if (ok?.modifiedCount === 0) {
        throw new Error(`Insufficient stock for ${item.productId}`);
      }
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItemsData.push({
        productId: product._id,
        price: product.price,
        quantity: item.quantity,
      });
    }

    //save order
    const orderData = [
      { userId, totalAmount, shippingAddress, customerId, sellerName },
    ];
    const [order] = await createOrderService(orderData, { session });
    const finalItems = orderItemsData.map((i) => ({
      ...i,
      orderId: order._id,
    }));

    await createOrderItemService(finalItems, session);
    await session.commitTransaction();

    res.status(201).json({
      status: "success",
      message: "Order created",
      orderId: order._id,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      status: "fail",
      message: "Couldn't create the order",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { _id, role } = req.user;
    const isAdmin = role === "admin" || role === "staff";

    const orders = await getAllOrder(isAdmin ? {} : { userId: _id }, isAdmin);

    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't get the order",
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderSerive(id);

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderUpdateByIdService(id, req.body);
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }
    res.status(202).json({
      status: "success",
      message: "Successfully updated the order",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't update the order",
      error: error.message,
    });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await deleteOrderService(id);


      const ok = await stockQuantityIncrease(
        item.productId,
        item.quantity,
        session
      );

    if (!order) {
      return res
        .status(404)
        .json({ status: "fail", message: "Order not found" });
    }

    res.status(202).json({
      status: "success",
      message: "Order successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't delete the order",
      error: error.message,
    });
  }
};
