const mongoose = require("mongoose");

// Define the schema
const roleSchema = new mongoose.Schema({
  roleType: String,
  guardName: String,
  MainAllSelect: Boolean,
  borrowersData: {
    selectAllBorrowers: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  expansesData: {
    selectAllExpanses: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  expansesCategoryData: {
    selectAllExpansesCategory: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  loanAgreementData: {
    selectAllLoanAgreement: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  loanSettlementData: {
    selectAllLoanSettlement: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  loanTypeData: {
    selectAllLoanType: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  loanData: {
    selectAllLoan: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  repaymentsData: {
    selectAllRepayments: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  transactionData: {
    selectAllTransaction: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  usersData: {
    selectAllUser: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
  walletData: {
    selectAllWallet: Boolean,
    childCheckboxes: [
      {
        name: String,
        value: Boolean,
      },
    ],
  },
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

module.exports = mongoose.model("Role", roleSchema);
