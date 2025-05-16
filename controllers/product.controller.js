const {
  createProductService,
  getAllProducts,
  productUpdateByIdService,
  getProductService,
  deleteProductService,
} = require("../services/product.service");

exports.createProduct = async (req, res) => {
  try {
    await createProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the product",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the product",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductService(id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productUpdateByIdService(id, req.body);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the product",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.productDeleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProductService(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: "fail", message: "Product not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Product successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};
