const mongoose = require("mongoose");

const Wallet = new mongoose.Schema({
  walletName: { type: String, required: true }, 
  addFunds: { type: Number, required: true }, 
  description: { type: String }, 
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true }, 
  deleted: { type: Boolean, default: false },  
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now }, 
  transactions: [
    {
      walletName: { type: String, required: true }, 
      transactionType: { type: String, enum: ['deposit', 'withdrawal'], required: true },
      amount: { type: Number, required: true }, 
      updatedBalance: { type: Number, required: true }, 
      transactionDate: { type: Date, default: Date.now }, 
      deleted:{type: Boolean, default: false}
    },
  ],
});

module.exports = mongoose.model("Wallet", Wallet);
