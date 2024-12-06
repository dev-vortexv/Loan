const mongoose = require("mongoose");

const Repayment = new mongoose.Schema({
  borrowersName: { type: String, required: true },
  currentBalance: { type: Number, required: true },
  paymentMethod: { type: String, require: true },
  repaymentAmount: { type: Number, require: true },
  transactionReference: { type: Number, require: true },
  loanStatus: { type: String },
  totalRepayment: { type: Number },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Repayment", Repayment);
