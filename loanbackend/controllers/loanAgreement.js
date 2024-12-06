const LoanAgreement = require("../model/loanAgreement");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await LoanAgreement.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .exec();

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  const loanAgreementResults = getAllResult.map((item) => {
    let parsedContent = JSON.parse(item.content);

    let textContent = parsedContent.blocks[0].text;

    const companyName = textContent.split("\n")[0];

    const customerNameMatch = textContent.match(/Dear\s+(\w+)/);
    const customerName = customerNameMatch ? customerNameMatch[1] : "N/A";

    return {
      _id: item._id,
      loanType: item.loanType,
      companyName,
      customerName,
    };
  });

  let totalRecords = loanAgreementResults.length;

  res.send({ getAllResult: loanAgreementResults, count: totalRecords });
};

const add = async (req, res) => {
  try {
    const addResult = new LoanAgreement(req.body);
    await addResult.save();
    res
      .status(201)
      .json({ addResult, message: "Loan Agreement  saved successfully" });
  } catch (err) {
    console.error("Failed to create Loan Agreement:", err);
    res.status(500).json({ error: "Failed to create Loan Agreement " });
  }
};

const edit = async (req, res) => {
  try {
    let result = await LoanAgreement.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res
      .status(200)
      .json({ result, message: "Loan Agreement updated successfully" });
  } catch (err) {
    console.error("Failed to Update Loan Agreement:", err);
    res.status(400).json({ error: "Failed to Update Loan Agreement" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await LoanAgreement.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Loan Agreement deleted successfully", deleteData });
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
