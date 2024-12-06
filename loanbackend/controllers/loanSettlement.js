const LoanSettlement = require("../model/loanSettlement");

// const getAllList = async (req, res) => {
//   const query = req.query;
//   query.deleted = false;
//   let allListData = await LoanSettlement.find(query)
//     .populate({
//       path: "createdBy",
//       match: { deleted: false }, // Populate only if createBy.deleted is false
//     })
//     .exec();

//   const getAllResult = allListData.filter((item) => item.createdBy !== null);

//   let totalRecords = getAllResult.length;

//   res.send({ getAllResult, count: totalRecords });
// };

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;

  let allListData = await LoanSettlement.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false },
    })
    .exec();

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  const loanSettledResults = getAllResult.map((item) => {
    let parsedContent = JSON.parse(item.content);

    let textContent = parsedContent.blocks[0].text;

    const companyName = textContent.split("\n")[0];

    const customerNameMatch = textContent.match(/Dear\s+(\w+)/);
    const customerName = customerNameMatch ? customerNameMatch[1] : "N/A";

    return {
      _id: item._id,
      companyName,
      customerName,
    };
  });

  // Get the total record count
  let totalRecords = loanSettledResults.length;

  // Send the response with the processed results and count
  res.send({ getAllResult: loanSettledResults, count: totalRecords });
};

const add = async (req, res) => {
  try {
    const addResult = new LoanSettlement(req.body);
    await addResult.save();
    res
      .status(201)
      .json({ addResult, message: "Loan Settlement  saved successfully" });
  } catch (err) {
    console.error("Failed to create Loan Settlement:", err);
    res.status(500).json({ error: "Failed to create Loan Settlement " });
  }
};

const edit = async (req, res) => {
  try {
    let result = await LoanSettlement.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res
      .status(200)
      .json({ result, message: "Loan Settlement updated successfully" });
  } catch (err) {
    console.error("Failed to Update Loan Settlement:", err);
    res.status(400).json({ error: "Failed to Update Loan Settlement" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await LoanSettlement.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Loan Settlement deleted successfully", deleteData });
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
