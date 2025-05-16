const {
  createSupplierService,
  getAllSupplier,
  supplierUpdateByIdService,
  getSupplierSerive,
  deleteSupplierService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res) => {
  try {
    await createSupplierService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the supplier",
      error: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await getAllSupplier(req.body);

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the supplier",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierSerive(id);

    if (!supplier) {
      return res.status(404).json({
        status: "fail",
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      status: "success",
      supplier: supplier,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updateSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await supplierUpdateByIdService(id, req.body);
    if (!supplier) {
      return res.status(404).json({
        status: "fail",
        message: "Supplier not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the supplier",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the supplier",
      error: error.message,
    });
  }
};

exports.supplierDeleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await deleteSupplierService(id);

    if (!supplier) {
      return res
        .status(404)
        .json({ status: "fail", message: "Supplier not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Supplier successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't delete the supplier",
      error: error.message,
    });
  }
};
