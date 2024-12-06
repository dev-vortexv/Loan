const payment = require("../model/Payments");

const getTotalPayment = async (req, res) => {
  let allData = await payment
    .find({ deleted: false })
    .populate("createdBy", ["firstName", "lastName"]);

  let totalRecords = allData.length;
  res.send({ paymentsData: allData, count: totalRecords });
};

const getPayment = async (req, res) => {
  const query = req.query;
  query.deleted = false;

  // Find payments based on query criteria
  let allData = await payment
    .find({
      deleted: false,
      createdBy: req.query.createdBy,
    })
    .populate("createdBy", ["firstName", "lastName"]);

  // Update the active status based on startDate and endDate
  const currentDate = new Date();
  const calculateEndDate = (createdOn, days) => {
    const createdDate = new Date(createdOn);
    const endDate = new Date(
      createdDate.getTime() + parseInt(days) * 24 * 60 * 60 * 1000
    );
    return endDate; // Return the calculated endDate
  };
  allData.forEach((payment) => {
    if (currentDate <= calculateEndDate(payment.createdOn, payment.days)) {
      payment.active = true; // Payment is active within the date range
    } else {
      payment.active = false; // Payment is inactive outside the date range
    }
  });

  // Count the total number of records
  let totalRecords = allData.length;

  // Send the response with updated payments data and count
  res.send({ paymentsData: allData, count: totalRecords });
};

const add = async (req, res) => {
  try {
    const payments = new payment(req.body);
    await payments.save();
    res.status(201).json({ payments, message: "Payment Saved Successfully" });
  } catch (err) {
    console.error("Failed To Create Payment", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const edit = async (req, res) => {
  try {
    let result = await payment.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ result, message: "Payment Update Successfully" });
  } catch (err) {
    console.error("Failed To Update Payment", err);
    res.status(400).json({ error: "Failed To Update Payments" });
  }
};

const deleteData = async (req, res) => {
  try {
    let payments = await payment.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res.status(200).json({ message: "Payment Delete Successfully ", payments });
  } catch (err) {
    res.status(404).json({ message: "Internal Server Error", err });
  }
};

module.exports = { getPayment, getTotalPayment, add, edit, deleteData };
