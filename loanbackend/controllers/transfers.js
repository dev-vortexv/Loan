const Transfer = require("../model/Transfer");
const Wallet = require("../model/Wallet");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await Transfer.find(query)
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
  const { fromAccount, toAccount, amount } = req.body;
  try {
    // Fetch sender's wallet information
    const senderWallet = await Wallet.findOne({ walletName: fromAccount });
    if (!senderWallet) {
      throw new Error("Sender's wallet not found");
    }

    let receiverWallet;
    if (toAccount !== "external") {
      receiverWallet = await Wallet.findOne({ walletName: toAccount });
      if (!receiverWallet) {
        throw new Error("Receiver's wallet not found");
      }
    }

    // Check if sender has sufficient balance for withdrawal
    if (amount < 0 && senderWallet.addFunds < Math.abs(amount)) {
      throw new Error("Insufficient funds for withdrawal");
    }

    senderWallet.addFunds -= amount;

    await senderWallet.save();

    const withdrawalTransfer = new Transfer({
      fromAccount: senderWallet.walletName,
      toAccount: receiverWallet.walletName,
      amount: Math.abs(amount),
      type: "withdrawal",
      createdBy: senderWallet.createdBy,
    });
    await withdrawalTransfer.save();

    // Update receiver's balance for deposit
    if (toAccount !== "external") {
      receiverWallet.addFunds += amount;
      await receiverWallet.save();

      const depositTransfer = new Transfer({
        fromAccount: receiverWallet.walletName,
        toAccount: senderWallet.walletName,
        amount: Math.abs(amount),
        type: "deposit",
        createdBy: receiverWallet.createdBy,
      });
      await depositTransfer.save();
    }

    res.status(201).json({ message: "Transfer saved successfully" });
  } catch (err) {
    console.error("Failed to create Transfer:", err);
    res.status(500).json({ error: "Failed to create Transfer" });
  }
};

const edit = async (req, res) => {
  try {
    let result = await Transfer.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ result, message: "Transfer updated successfully" });
  } catch (err) {
    console.error("Failed to Update Transfer:", err);
    res.status(400).json({ error: "Failed to Update Transfer" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await Transfer.findByIdAndDelete(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Transfer deleted successfully", deleteData });
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
