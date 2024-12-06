const mongoose = require("mongoose");

const LoanType = new mongoose.Schema({
  interestCycle: { type: String, required: true },
  interestRate: { type: Number, required: true },
  loanName: { type: String, require: true },
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

module.exports = mongoose.model("LoanType", LoanType);
