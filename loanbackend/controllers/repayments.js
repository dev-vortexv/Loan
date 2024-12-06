const Repayment = require("../model/Repayments");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await Repayment.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .exec();

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  let totalRecords = getAllResult.length;

  res.send({ getAllResult, count: totalRecords });
};

const add = async (req, res) => {
  try {
    const { repaymentAmount, currentBalance, ...otherFields } = req.body;

    const totalRepayment = repaymentAmount + currentBalance;

    const addResult = new Repayment({
      ...otherFields,
      repaymentAmount,
      currentBalance,
      totalRepayment,
    });

    await addResult.save();

    res
      .status(201)
      .json({ addResult, message: "Repayments saved successfully" });
  } catch (err) {
    console.error("Failed to create Repayment:", err);
    res.status(500).json({ error: "Failed to create Repayments" });
  }
};

const edit = async (req, res) => {
  try {
    let result = await Repayment.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res
      .status(200)
      .json({ result, message: "Repayments updated successfully" });
  } catch (err) {
    console.error("Failed to Update Repayments:", err);
    res.status(400).json({ error: "Failed to Update Repayments" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await Repayment.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Repayments deleted successfully", deleteData });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

module.exports = {
  getAllList,
  add,
  edit,
  deleteData,
};
