const mongoose = require("mongoose");

const Loan = new mongoose.Schema({
  loanNumber: {
    type: String,
    unique: true, // Ensure loan number is unique
  },
  loanType: { type: String, required: true },
  borrowers: {
    type: mongoose.Schema.ObjectId,
    ref: "Borrower",
    required: true,
  },
  SelectOffers: { type: Boolean },
  loanOffer: { type: mongoose.Schema.ObjectId, ref: "LoanOffer" },
  durationPeriod: { type: String, require: true },
  interestAmount: { type: String, require: true },
  interestRate: { type: String, require: true },
  loanDuration: { type: Number, require: true },
  loanStatus: { type: String, require: true },
  statusHistory: [
    {
      status: { type: String, required: true },
      changedOn: { type: Date, default: Date.now },
    },
  ],
  landers: {
    type: mongoose.Schema.ObjectId,
    ref: "Landers",
    required: true,
  },
  principleAmount: { type: Number, require: true },
  releaseDate: { type: String, require: true },
  repaymentAmount: { type: Number, require: true },
  // fromAccount: { type: mongoose.Schema.ObjectId, ref: "Wallet", require: true },
  fromAccount: { type: String, require: true },
  TransactionReference: { type: String, require: true },
  monthlyEmi: { type: Number },
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
  transactionHistory: [
    {
      transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      receiveAmount: { type: Number, required: true },
      paymentType: { type: String },
      updatedRepaymentAmount: { type: Number, required: true },
      transactionDate: { type: Date, default: Date.now },
      deleted: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Loan", Loan);
