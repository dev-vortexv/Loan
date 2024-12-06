const ExpanseCategories = require("../model/ExpanseCategories");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await ExpanseCategories.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .exec();

  const getAllResult = allListData.filter((item) => item.createdBy !== null);

  let totalRecords = getAllResult.length;

  res.send({ getAllResult, count: totalRecords });
};

const add = async (req, res) => {
  try {
    const addResult = new ExpanseCategories(req.body);
    await addResult.save();
    res
      .status(201)
      .json({ addResult, message: "Expanse Categories  saved successfully" });
  } catch (err) {
    console.error("Failed to create Expanse Categories:", err);
    res.status(500).json({ error: "Failed to create Expanse Categories " });
  }
};

const edit = async (req, res) => {
  try {
    let result = await ExpanseCategories.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res
      .status(200)
      .json({ result, message: "Expanse Categories updated successfully" });
  } catch (err) {
    console.error("Failed to Update Expanse Categories:", err);
    res.status(400).json({ error: "Failed to Update Expanse Categories" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await ExpanseCategories.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Expanse Categories deleted successfully", deleteData });
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
