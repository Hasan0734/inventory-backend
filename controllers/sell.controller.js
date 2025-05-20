const { getSellsService } = require("../services/sell.service");

exports.getSells = async (req, res) => {
  try {
    const sells = await getSellsService();

    res.status(200).json({
      fail: "success",
      data: sells,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't get the sells data",
      error: error.message,
    });
  }
};

exports.createSell = async (req, res) => {
  const { shippingAddress, items, customerId, sellerName } = req.body;
  const userId = req.user._id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //calculate total
    let totalAmount = 0;
    const sellItemsData = [];

    for (let item of items) {
      const product = await getProductService(item.productId);
      if (!product) throw new Error("Product not found");

      const ok = await stockQuantityIncrease(
        item.productId,
        item.quantity,
        session
      );
      console.log(ok);
      if (ok?.modifiedCount === 0) {
        throw new Error(`Insufficient stock for ${item.productId}`);
      }
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      sellItemsData.push({
        productId: product._id,
        price: product.price,
        quantity: item.quantity,
      });
    }

    //save order
    const [sell] = await createOrderService(
      [{ userId, totalAmount, shippingAddress }],
      { session }
    );
    const finalItems = sellItemsData.map((i) => ({
      ...i,
      sellId: sell._id,
    }));

    await createOrderItemService(finalItems, session);
    await session.commitTransaction();

    res.status(201).json({
      status: "success",
      message: " created",
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
