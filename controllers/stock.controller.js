const {
  createStockService,
  getAllStock,
  stockUpdateByIdService,
  getStockService,
  deleteStockService,
  getStockByProductIdService,
} = require("../services/stock.service");

exports.createStock = async (req, res) => {
  try {
    await createStockService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the stock",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the stock",
      error: error.message,
    });
  }
};

exports.getStocks = async (req, res) => {
  try {
    const stocks = await getAllStock(req.body);

    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the stock",
      error: error.message,
    });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await getStockService(id);

    if (!stock) {
      return res.status(404).json({
        status: "fail",
        message: "Stock not found",
      });
    }

    res.status(200).json({
      status: "success",
      stock: stock,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};
exports.getStockByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await getStockByProductIdService(id);
    if (!stock) {
      return res.status(404).json({
        status: "fail",
        message: "Stock not found",
      });
    }

    res.status(200).json({
      status: "success",
      stock: stock,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updateStockById = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await stockUpdateByIdService(id, req.body);
    if (!stock) {
      return res.status(404).json({
        status: "fail",
        message: "Stock not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the stock",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the stock",
      error: error.message,
    });
  }
};

exports.stockDeleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await deleteStockService(id);

    if (!stock) {
      return res
        .status(404)
        .json({ status: "fail", message: "Stock not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Stock successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't delete the stock",
      error: error.message,
    });
  }
};
