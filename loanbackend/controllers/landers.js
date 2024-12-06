const Landers = require("../model/Landers");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await Landers.find(query)
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
    const addResult = new Landers(req.body);
    await addResult.save();
    res
      .status(201)
      .json({ addResult, message: "Landers Details  saved successfully" });
  } catch (err) {
    console.error("Failed to create Landers details:", err);
    res.status(500).json({ error: "Failed to create Landers " });
  }
};

const edit = async (req, res) => {
  try {
    let result = await Landers.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res
      .status(200)
      .json({ result, message: "Landers Details updated successfully" });
  } catch (err) {
    console.error("Failed to Update Landers Details:", err);
    res.status(400).json({ error: "Failed to Update Landers Details" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await Landers.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Landers deleted successfully", deleteData });
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
