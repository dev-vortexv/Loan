const mongoose = require("mongoose");

const Payment = new mongoose.Schema({
  subscription_id: { type: String },
  title: { type: String },
  days: { type: String },
  amount: { type: Number },
  description: { type: String },
  active: { type: Boolean, default: true },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", Payment);
