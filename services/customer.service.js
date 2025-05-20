const Customer = require("../models/Customer");

exports.getCustomerService = async (queries) => {
  const customers = await Customer.find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy);

  const total = await Customer.countDocuments();

  const page = Math.ceil(total / queries.limit);

  console.log(queries);
  return { customers, total, page };
};

exports.createCustomerService = async (data) => {
  const customer = await Customer.create(data);
  return customer;
};

exports.getCustomerByPhone = async (phone) => {
  const customer = await Customer.findOne({ phone });
  return customer;
};

exports.updateCustomerService = async (id, data) => {
  console.log(data);
  const customer = await Customer.findByIdAndUpdate(id, data, { new: true });
  return customer;
};

exports.deleteCustomerService = async (id) => {
  const customer = await Customer.findByIdAndDelete(id);
  return customer;
};
