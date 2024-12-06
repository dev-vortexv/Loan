const mongoose = require("mongoose");

const LoanOffer = new mongoose.Schema({
  offerName: { type: String, required: true },
  loanType: { type: String, required: true },
  status: { type: String, required: true },
  interestRate: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  deleted: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LoanOffer", LoanOffer);
