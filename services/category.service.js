const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
  const category = Category.create(data);
  return category;
};

exports.getAllCategory = async () => {
  const categories = Category.find({});
  return categories;
};

exports.categoryUpdateByIdService = async (id, data) => {
  const category = await Category.findByIdAndUpdate({ _id: id }, data, {
    runValidators: true,
  });
  return category;
};

exports.getCategorySerive = async (id) => {
  const category = await Category.findById(id);
  return category;
};

exports.deleteCategoryService = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  return category;
};
