const { default: mongoose } = require("mongoose");
const Borrower = require("../model/Borrower");
const BorrowerDocuments = require("../model/BorrowerDocuments");

const getAllBorrowersList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allBorrower = await Borrower.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .exec();

  const borrowerAllData = allBorrower.filter((item) => item.createdBy !== null);

  let totalRecords = borrowerAllData.length;

  res.send({ borrowerAllData, count: totalRecords });
};

const add = async (req, res) => {
  try {
    const borrowerData = req.body;

    if (
      req.files &&
      req.files.bankStatement &&
      req.files.bankStatement.length > 0
    ) {
      const bankStatementFile = req.files.bankStatement[0];

      // Store file details in borrowerData
      borrowerData.bankStatement = {
        fileName: bankStatementFile.filename,
        filePath: bankStatementFile.path,
      };
    }

    const savedBorrowersDetails = await Borrower.create(borrowerData);

    res.status(200).json({
      borrower: savedBorrowersDetails,
      message: "Borrower details saved successfully",
    });
  } catch (error) {
    // Log and send error response
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const borrowerId = req.params.id;
    const borrowerData = req.body;

    // Find the borrower by ID
    const existingBorrower = await Borrower.findById(borrowerId);

    if (!existingBorrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    // Update borrower details from request body
    Object.assign(existingBorrower, borrowerData);

    // Check if new bank statement file is provided
    if (
      req.files &&
      req.files.bankStatement &&
      req.files.bankStatement.length > 0
    ) {
      const bankStatementFile = req.files.bankStatement[0];

      // Update file details
      existingBorrower.bankStatement = {
        fileName: bankStatementFile.filename,
        filePath: bankStatementFile.path,
      };
    }

    // Save updated borrower details
    const updatedBorrowerDetails = await existingBorrower.save();

    res.status(200).json({
      borrower: updatedBorrowerDetails,
      message: "Borrower details updated successfully",
    });
  } catch (error) {
    // Log and send error response
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteData = async (req, res) => {
  try {
    let borrowerDelete = await Borrower.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res.status(200).json({
      message: "Borrower Details deleted successfully",
      borrowerDelete,
    });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

const viewBorrowersDetails = async (req, res) => {
  try {
    // Get the borrower ID from the route parameters
    const borrowerId = req.params.id;

    // Query to find borrower by ID and ensure it is not deleted
    let borrowerDetails = await Borrower.findOne({
      _id: borrowerId,
      deleted: false,
    })
      .populate({
        path: "createdBy",
        match: { deleted: false }, // Populate only if createdBy.deleted is false
      })
      .exec();

    // If borrower doesn't exist or createdBy is null, return an error
    if (!borrowerDetails || borrowerDetails.createdBy === null) {
      return res
        .status(404)
        .send({ message: "Borrowers Details not found or invalid createdBy" });
    }

    // Return the borrower details
    res.send({ borrowerDetails });
  } catch (error) {
    console.error("Error fetching borrower details:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addBorrowersDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req.files;

    if (!file || !file[0]) {
      return res.status(400).send({ message: "File is required." });
    }

    const borrowerDocument = new BorrowerDocuments({
      borrowerId: mongoose.Types.ObjectId(id),
      fileName: req.body.fileName,
      file: {
        name: file[0].originalname,
        type: file[0].mimetype,
      },
      createdBy: req.body.createdBy,
    });

    await borrowerDocument.save();
    res.status(201).send({
      message: " Borrower Document uploaded successfully.",
      borrowerDocument,
    });
  } catch (error) {
    console.error("Error saving Borrower document:", error);
    res.status(500).send({ message: "Error saving the Borrower document." });
  }
};

const getBorrowersAllDocuments = async (req, res) => {
  try {
    const { id } = req.params; // Borrower ID from route parameters

    if (!id) {
      return res.status(400).send({ message: "Borrower ID is required." });
    }

    // Query the database for documents related to the borrower
    const documents = await BorrowerDocuments.find({
      borrowerId: mongoose.Types.ObjectId(id), // Filter by the borrower's ID
      deleted: false, // Exclude deleted documents
    });

    // Respond with the documents
    res.status(200).send({ borrowerId: id, documents });
  } catch (error) {
    console.error("Error fetching borrower documents:", error);
    res.status(500).send({ message: "Server error while fetching documents." });
  }
};

const deleteBorrowerDocuments = async (req, res) => {
  try {
    let borrowerDelete = await BorrowerDocuments.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res.status(200).json({
      message: "Borrower Documents deleted successfully",
      borrowerDelete,
    });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

const editBorrowerDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req.files;

    const borrowerDocument = await BorrowerDocuments.findById(id);

    if (!borrowerDocument) {
      return res.status(404).send({ message: "Borrower document not found." });
    }

    if (req.body.fileName) {
      borrowerDocument.fileName = req.body.fileName;
    }
    if (req.body.createdBy) {
      borrowerDocument.createdBy = req.body.createdBy;
    }

    if (file && file[0]) {
      borrowerDocument.file = {
        name: file[0].originalname,
        type: file[0].mimetype,
      };
    }

    await borrowerDocument.save();

    res.status(200).send({
      message: "Borrower document updated successfully.",
      borrowerDocument,
    });
  } catch (error) {
    console.error("Error updating Borrower document:", error);
    res.status(500).send({ message: "Error updating the Borrower document." });
  }
};

module.exports = {
  getAllBorrowersList,
  add,
  edit,
  deleteData,
  viewBorrowersDetails,
  addBorrowersDocuments,
  getBorrowersAllDocuments,
  deleteBorrowerDocuments,
  editBorrowerDocuments,
};
