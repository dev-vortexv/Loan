const mongoose = require("mongoose");
const Currency = new mongoose.Schema({
  currencyName: { type: String, required: true },
  currencyStatus: { type: String, required: true },
  currencySymbol: { type: String, required: true },
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

module.exports = mongoose.model("Currency", Currency);
