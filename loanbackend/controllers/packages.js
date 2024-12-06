const Packages = require("../model/Packages");


const getList = async (req, res) => {
  let allData = await Packages.find({ deleted: false });

  let totalRecords = allData.length;
  res.send({ packagesAllData: allData, count: totalRecords });
};

const add = async (req, res) => {
  
  try {
    const packages = new Packages(req.body);
    await packages.save();
    res
      .status(201)
      .json({ packages, message: 'PACKAGES_SAVED_SUCCESSFULLY' });
  } catch (err) {
   
    res.status(500).json({ error: 'FAILED_TO_CREATE_PACKAGES' });
  }
};

const edit = async (req, res) => {
  
  try {
    let result = await Packages.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res
      .status(200)
      .json({ result, message: 'PACKAGES_UPDATED_SUCCESSFULLY' });
  } catch (err) {
    console.error('FAILED_TO_UPDATE_PACKAGES');
    res.status(400).json({ error: 'FAILED_TO_UPDATE_PACKAGES' });
  }
};

const deleteData = async (req, res) => {
 
  try {
    let packages = await Packages.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: 'PACKAGES_DELETED_SUCCESSFULLY' });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

module.exports = { getList, add, edit, deleteData };
