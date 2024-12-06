const mongoose = require("mongoose");
const PaymentMethod = new mongoose.Schema({
  paymentType: { type: String, required: true },
  status: { type: String, required: true },
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

module.exports = mongoose.model("PaymentMethod", PaymentMethod);
