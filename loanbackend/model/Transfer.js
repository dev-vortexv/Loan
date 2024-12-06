const mongoose = require("mongoose");

const Transfer = new mongoose.Schema({
  fromAccount: { type: String, required: true },
  toAccount: { type: String, required: true },
  amount: { type: Number, require: true },
  type: { type: String },
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

module.exports = mongoose.model("Transfer", Transfer);
