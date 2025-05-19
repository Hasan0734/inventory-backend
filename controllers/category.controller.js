const {
  createCategoryService,
  getAllCategory,
  categoryUpdateByIdService,
  getCategorySerive,
  deleteCategoryService,
} = require("../services/category.service");

exports.createCategory = async (req, res) => {
  try {
    await createCategoryService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the category",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the category",
      error: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await getAllCategory();

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the category",
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategorySerive(id);

    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: "success",
      category: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryUpdateByIdService(id, req.body);
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the category",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the category",
      error: error.message,
    });
  }
};

exports.categoryDeleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await deleteCategoryService(id);

    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Category successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't delete the category",
      error: error.message,
    });
  }
};
