const {
  getCustomerService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
  getCustomerByPhone,
} = require("../services/customer.service");

exports.getCustomers = async (req, res) => {
  try {
    let filters = { ...req.query };

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = limit;
    }

    const customers = await getCustomerService(queries);

    res.status(200).json({
      status: "success",
      ...customers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the cutomer",
      error: error.message,
    });
  }
};

exports.createCustomer = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;

    if (!phone) {
      return res.status(400).json({
        status: "fail",
        message: "Phone number is required",
      });
    }

    const existingCustomer = await getCustomerByPhone(phone);

    if (existingCustomer) {
      if (name !== existingCustomer.name) {
        const updatedCustomer = await updateCustomerService(
          existingCustomer._id,
          req.body
        );

        return res.status(201).json({
          status: "success",
          message: "Customer updated successfully",
          customer: updatedCustomer,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Customer already exists",
        customer: existingCustomer,
      });
    }

    const newCustomer = await createCustomerService(req.body);

    return res.status(201).json({
      status: "success",
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Couldn't create the customer",
      error: error.message,
    });
  }
};

exports.updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const customer = await updateCustomerService(id, req.body);

    if (!customer) {
      return res.status(404).json({
        satus: "fail",
        message: "Customer not found!",
      });
    }
    res.status(201).json({
      satus: "success",
      message: "Customer update successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't update the customer",
      error: error.message,
    });
  }
};

exports.deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await deleteCustomerService(id);

    if (!customer) {
      return res.status(404).json({
        satus: "fail",
        message: "Customer not found!",
      });
    }
    res.status(201).json({
      satus: "success",
      message: "Customer delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't datele the customer",
      error: error.message,
    });
  }
};
