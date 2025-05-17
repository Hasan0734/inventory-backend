const Stock = require("../models/Stock");

exports.createStockService = async (data) => {
  const stock = Stock.create(data);
  return stock;
};

exports.getAllStock = async () => {
  const stocks = Stock.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },

    // {
    //   $lookup: {
    //     from: 'suppliers',
    //     localField: 'supplierId',
    //     foreignField: '_id',
    //     as: 'supplier'
    //   }
    // }
  ]);
  return stocks;
};

exports.stockUpdateByIdService = async (id, data) => {
  const stock = await Stock.findByIdAndUpdate({ _id: id }, data, {
    runValidators: true,
  });
  return stock;
};

exports.getStockService = async (id) => {
  const stock = await Stock.findById(id);
  return stock;
};

exports.getStockByProductIdService = async (id) => {
  const stock = await Stock.findOne({ productId: id });
  return stock;
};

exports.stockQuantityIncrease = async (productId, quantity, session) => {
  const stock = await Stock.updateOne(
    { productId, quantity: { $gte: quantity } },
   [
    { $set: { quantity: { $subtract: ["$quantity", quantity] } } },         // atomic decrement
    { $set: {                                              // conditional status change
        status: {
          $cond: [{ $eq: ["$quantity", 0] }, "out-of-stock", "in-stock"]
        }
      }
    }
  ],
    {session}
  );
  return stock;
};

exports.deleteStockService = async (id) => {
  const stock = await Stock.findByIdAndDelete(id);
  return stock;
};
