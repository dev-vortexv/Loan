const mongoose = require("mongoose");

const Landers = new mongoose.Schema({
  displayName: { type: String, required: true },
  landersName: { type: String, required: true },
  code: { type: String, require: true },
  mobile: { type: String, require: true },
  email: { type: String, require: true },
  GSTNumber: { type: String, require: true },
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

module.exports = mongoose.model("Landers", Landers);
