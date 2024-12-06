const mongoose = require("mongoose");

const BorrowerSchema = new mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: String },
  gender: { type: String },
  fatherName: { type: String },
  emailID: { type: String },
  phoneNumber: { type: Number },
  occupationType: { type: String },
  aadhaarNumber: { type: Number },
  panNumber: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  pinCode: { type: Number, default: null },
  residingSince: { type: String },
  ownerShipType: { type: String },
  sameAsPermanentAddress: { type: Boolean },
  residenceAddressLine1: { type: String },
  residenceAddressLine2: { type: String },
  residencePinCode: { type: Number, default: null },
  residenceResidingSince: { type: String },
  residenceOwnerShipType: { type: String },
  businessName: { type: String },
  annualTurnOver: { type: Number, default: null },
  industryType: { type: String },
  businessType: { type: String },
  accountType: { type: String },
  accountHolder: { type: String },
  accountNumber: { type: Number, default: null },
  ifsc: { type: String },
  bankStatement: {
    fileName: { type: String },
    filePath: { type: String },
  },
  status: { type: String, default: "No-verified" },
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

const Borrower = mongoose.model("Borrower", BorrowerSchema);
module.exports = Borrower;
