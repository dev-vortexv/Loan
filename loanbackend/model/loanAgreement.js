const mongoose = require("mongoose");

const LoanAgreement = new mongoose.Schema({
  loanType: { type: String, required: true },
  content: { type: Object },
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

module.exports = mongoose.model("LoanAgreement", LoanAgreement);
