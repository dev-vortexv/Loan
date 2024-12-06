const LoanOffers = require("../model/LoanOffers");
const mongoose = require("mongoose");

const getAllList = async (req, res) => {
  const query = req.query;

  query.deleted = false;
  let allListData = await LoanOffers.find(query);

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  let totalRecords = getAllResult.length;

  res.send({ getAllResult, count: totalRecords });
};

const add = async (req, res) => {
  try {
    const addResult = new LoanOffers(req.body);
    await addResult.save();
    res
      .status(201)
      .json({ addResult, message: "Loan Offer  saved successfully" });
  } catch (err) {
    console.error("Failed to create Loan offer:", err);
    res.status(500).json({ error: "Failed to create Offer " });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params; // ID of the loan offer to edit
    const updatedData = req.body; // Data to update

    // Find the loan offer by ID and update it
    const updatedLoanOffer = await LoanOffers.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // Return the updated document
    );

    if (!updatedLoanOffer) {
      return res.status(404).json({ error: "Loan Offer not found" });
    }

    res.status(200).json({
      updatedLoanOffer,
      message: "Loan Offer updated successfully",
    });
  } catch (err) {
    console.error("Failed to update Loan Offer:", err);
    res.status(500).json({ error: "Failed to update Loan Offer" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await LoanOffers.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Loan Offer deleted successfully", deleteData });
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
