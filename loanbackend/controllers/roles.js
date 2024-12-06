const Roles = require("../model/Roles");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await Roles.find({
    deleted: false,
  });

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  let totalRecords = getAllResult.length;

  const countTrueValues = (checkboxes) => {
    let count = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.value === true) {
        count++;
      }
    });
    return count;
  };

  // Iterate through each response
  const responsesWithTotalCount = getAllResult.map((response, index) => {
    const borrowersTrueCount = countTrueValues(
      response.borrowersData.childCheckboxes
    );
    const expansesTrueCount = countTrueValues(
      response.expansesData.childCheckboxes
    );
    const expansesCategoryData = countTrueValues(
      response.expansesCategoryData.childCheckboxes
    );
    const loanAgreementData = countTrueValues(
      response.loanAgreementData.childCheckboxes
    );
    const loanData = countTrueValues(response.loanData.childCheckboxes);

    const loanSettlementData = countTrueValues(
      response.loanSettlementData.childCheckboxes
    );
    const loanTypeData = countTrueValues(response.loanTypeData.childCheckboxes);
    const repaymentsData = countTrueValues(
      response.repaymentsData.childCheckboxes
    );
    const transactionData = countTrueValues(
      response.transactionData.childCheckboxes
    );
    const usersData = countTrueValues(response.usersData.childCheckboxes);
    const walletData = countTrueValues(response.walletData.childCheckboxes);

    const totalPermissionCount =
      borrowersTrueCount +
      expansesTrueCount +
      expansesCategoryData +
      loanAgreementData +
      loanSettlementData +
      loanTypeData +
      loanData +
      repaymentsData +
      transactionData +
      usersData +
      walletData;

    return {
      ...response.toObject(), // Convert Mongoose document to plain object
      totalPermissionCount,
    };
  });

  res.send({
    getAllResult: responsesWithTotalCount,
    count: totalRecords,
  });
};

const add = async (req, res) => {
  try {
    const addResult = new Roles(req.body);
    await addResult.save();
    res.status(201).json({ addResult, message: "Roles  saved successfully" });
  } catch (err) {
    console.error("Failed to create Roles:", err);
    res.status(500).json({ error: "Failed to create Roles" });
  }
};

const edit = async (req, res) => {
  try {
    let result = await Roles.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ result, message: "Roles updated successfully" });
  } catch (err) {
    console.error("Failed to Update Expanse Categories:", err);
    res.status(400).json({ error: "Failed to Update Roles" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await Roles.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res.status(200).json({ message: "Roles deleted successfully", deleteData });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

module.exports = {
  getAllList,
  add,
  edit,
  deleteData,
};
