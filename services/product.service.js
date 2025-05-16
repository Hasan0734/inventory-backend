
const Product = require("../models/Product");

exports.createProductService = async (data) => {
  const product = Product.create(data);
  return product;
};

exports.getAllProducts = async () => {
  const products = Product.find({}).select('-__v').populate('stock', 'quantity status sellCount -productId -_id');
  return products;
};

exports.productUpdateByIdService = async (id, data) => {
  const product = await Product.findByIdAndUpdate({ _id: id }, data, {
    runValidators: true,
  });
  return product;
};

exports.getProductService = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
