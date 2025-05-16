const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const supplier = Supplier.create(data);
  return supplier;
};

exports.getAllSupplier = async () => {
  const suppliers = Supplier.find({});
  return suppliers;
};

exports.supplierUpdateByIdService = async (id, data) => {
  const supplier = await Supplier.findByIdAndUpdate({ _id: id }, data, {
    runValidators: true,
  });
  return supplier;
};

exports.getSupplierSerive = async (id) => {
  const supplier = await Supplier.findById(id);
  return supplier;
};

exports.deleteSupplierService = async (id) => {
  const supplier = await Supplier.findByIdAndDelete(id);
  return supplier;
};
