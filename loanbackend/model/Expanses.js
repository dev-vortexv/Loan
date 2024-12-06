const mongoose = require("mongoose");

const Expanses = new mongoose.Schema({
  expanseName: { type: String, required: true },
  expanseVendor: { type: String, required: true },
  expanseAmount: { type: Number, required: true },
  expanseDate: { type: String, required: true },
  expanseCategory: { type: String, required: true },
  expanseFromAccount: {type: mongoose.Schema.ObjectId, ref: "Wallet", required: true },
  fileName: { type: String },
  path: { type: String },
  fileType: { type: String },
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

module.exports = mongoose.model("Expanses", Expanses);
