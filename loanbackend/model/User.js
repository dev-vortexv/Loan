const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, require: true },
  password: { type: String, require: true },
  AgreeChecked: { type: Boolean, require: true },
  role: { type: String, default: "admin" },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    default: "",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", User);
