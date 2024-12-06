const Wallet = require("../model/Wallet");
const mongoose = require("mongoose");

const getAllList = async (req, res) => {
  const query = req.query;

  query.deleted = false;
  let allListData = await Wallet.find(query);

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  let totalRecords = getAllResult.length;

  res.send({ getAllResult, count: totalRecords });
};

const add = async (req, res) => {
  try {
    const addResult = new Wallet(req.body);
    await addResult.save();
    res.status(201).json({ addResult, message: "Wallet  saved successfully" });
  } catch (err) {
    console.error("Failed to create Wallet:", err);
    res.status(500).json({ error: "Failed to create Wallet " });
  }
};

const edit = async (req, res) => {
  try {
    let wallet = await Wallet.findById(req.params.id);
    const oldAmount = wallet.addFunds;
    const newAmount = req.body.addFunds;

    if (oldAmount !== newAmount) {
      const transactionType = newAmount > oldAmount ? "deposit" : "withdrawal";
      const transactionAmount = Math.abs(newAmount - oldAmount);

      wallet.transactions.push({
        walletName: wallet.walletName,
        transactionType: transactionType,
        amount: transactionAmount,
        updatedBalance: newAmount,
      });
    }

    wallet.addFunds = newAmount;
    wallet.modifiedOn = Date.now();
    await wallet.save();

    res.status(200).json({ wallet, message: "Wallet updated successfully" });
  } catch (err) {
    console.error("Failed to Update Wallet:", err);
    res.status(400).json({ error: "Failed to Update Wallet" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await Wallet.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Wallet deleted successfully", deleteData });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};
const deleteHistoryData = async (req, res) => {
  try {
    let deleteData = await Wallet.updateOne(
      { "transactions._id": req.params.id },
      { $set: { "transactions.$.deleted": true } }
    );

    if (deleteData.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Transaction not found or already deleted" });
    }

    res
      .status(200)
      .json({ message: "Transaction deleted successfully", deleteData });
  } catch (err) {
    res.status(500).json({ message: "error", err });
  }
};

const getWalletHistoryDetails = async (req, res) => {
  try {
    const walletId = req.params.id;

    // Use Mongoose aggregation to filter transactions
    const walletDetails = await Wallet.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(walletId),
          deleted: false,
        },
      },
      {
        $project: {
          walletName: 1,
          addFunds: 1,
          description: 1,
          createdBy: 1,
          transactions: {
            $filter: {
              input: "$transactions",
              as: "transaction",
              cond: { $eq: ["$$transaction.deleted", false] }, // Only include transactions where deleted is false
            },
          },
        },
      },
    ]);

    if (!walletDetails.length) {
      return res.status(404).send({
        message: "Wallet details not found or transactions not found",
      });
    }

    res.send({ walletDetails: walletDetails[0] });
  } catch (error) {
    console.error("Error fetching wallet details:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllList,
  add,
  edit,
  deleteData,
  getWalletHistoryDetails,
  deleteHistoryData,
};
