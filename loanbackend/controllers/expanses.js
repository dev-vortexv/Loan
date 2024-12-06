const Expanses = require("../model/Expanses");
const mongoose = require("mongoose");
const Wallet = require("../model/Wallet");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await Expanses.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .exec();

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  let totalRecords = getAllResult.length;

  res.send({ getAllResult, count: totalRecords });
};

const getAllBusinessExpenses = async (req, res) => {
  try {
    const allListData = await Expanses.aggregate([
      {
        $match: {
          deleted: false,
          createdBy: mongoose.Types.ObjectId(req.query.createdBy),
        },
      },
      {
        $group: {
          _id: {
            month: {
              $dateToString: {
                format: "%b",
                date: { $toDate: "$expanseDate" },
              },
            }, // Get month name (e.g., Jan)
            year: { $year: { $toDate: "$expanseDate" } },
          },
          totalAmount: { $sum: "$expanseAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          totalAmount: 1,
        },
      },
    ]);

    res.send(allListData);
  } catch (error) {
    console.error("Error while fetching expenses:", error);
    res.status(500).send("Internal Server Error");
  }
};

const add = async (req, res) => {
  try {
    let fileData = {};
    if (req.file) {
      fileData = {
        path: req.file.path,
        fileName: req.file.fileName,
      };
    }

    const wallet = await Wallet.findById(req.body.expanseFromAccount);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const expenseAmount = req.body.expanseAmount;
    wallet.addFunds -= expenseAmount;

    wallet.transactions.push({
      walletName: wallet.walletName,
      transactionType: 'withdrawal',
      amount: expenseAmount,
      updatedBalance: wallet.addFunds,
    });

    await wallet.save();

    const file = await Expanses.create({
      ...fileData,
      expanseDate: req.body.expanseDate,
      expanseVendor: req.body.expanseVendor,
      expanseName: req.body.expanseName,
      expanseAmount: req.body.expanseAmount,
      expanseFromAccount: req.body.expanseFromAccount,
      expanseCategory: req.body.expanseCategory,
      createdBy: req.body.createdBy,
    });

    res.status(200).json({ file, message: "Expense saved and wallet updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};


const edit = async (req, res) => {


  try {
    if (req.file) {
      req.body.fileName = req.file.filename;
    }

    let result = await Expanses.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ result, message: "Expenses updated successfully" });
  } catch (err) {
    console.error("Failed to Update Expenses:", err);
    res.status(400).json({ error: "Failed to Update Expenses" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await Expanses.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Expanses  deleted successfully", deleteData });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

module.exports = {
  getAllList,
  add,
  edit,
  deleteData,
  getAllBusinessExpenses,
};
