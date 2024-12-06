const mongoose = require("mongoose");

const BorrowerDocument = new mongoose.Schema({
  borrowerId: { type: mongoose.Schema.ObjectId, ref: "Borrower" },
  fileName: { type: String, required: true },
  file: {
    name: { type: String },
    type: { type: String },
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

const Borrower = mongoose.model("BorrowerDocument", BorrowerDocument);
module.exports = Borrower;
