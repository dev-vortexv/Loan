const mongoose = require("mongoose");

const LoanSettlement = new mongoose.Schema({
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

module.exports = mongoose.model("LoanSettlement", LoanSettlement);
