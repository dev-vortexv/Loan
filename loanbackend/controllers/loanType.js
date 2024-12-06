const LoanType = require("../model/LoanType");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await LoanType.find(query)
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
    const addResult = new LoanType(req.body);
    await addResult.save();
    res
      .status(201)
      .json({ addResult, message: "Loan Type  saved successfully" });
  } catch (err) {
    console.error("Failed to create Loan Type:", err);
    res.status(500).json({ error: "Failed to create Loan Type " });
  }
};

const edit = async (req, res) => {
  try {
    let result = await LoanType.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ result, message: "Loan Type updated successfully" });
  } catch (err) {
    console.error("Failed to Update Loan Type:", err);
    res.status(400).json({ error: "Failed to Update Loan Type" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await LoanType.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Loan Type deleted successfully", deleteData });
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
