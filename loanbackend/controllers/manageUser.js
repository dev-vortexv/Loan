const ManageUser = require("../model/ManageUser");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await ManageUser.find(query)
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
    const addResult = new ManageUser(req.body);
    await addResult.save();
    res
      .status(201)
      .json({ addResult, message: "Manage Users  saved successfully" });
  } catch (err) {
    console.error("Failed to create Manage Users:", err);
    res.status(500).json({ error: "Failed to create Manage Users " });
  }
};

const edit = async (req, res) => {
  try {
    let result = await ManageUser.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res
      .status(200)
      .json({ result, message: "Manage Users updated successfully" });
  } catch (err) {
    console.error("Failed to Update Manage Users:", err);
    res.status(400).json({ error: "Failed to Update Manage Users" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await ManageUser.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Manage Users deleted successfully", deleteData });
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
