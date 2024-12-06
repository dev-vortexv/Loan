const Loan = require("../model/Loan");
const Wallet = require("../model/Wallet");
const Landers = require("../model/Landers");
const LoanOffers = require("../model/LoanOffers");
const Borrower = require("../model/Borrower");
const mongoose = require("mongoose");

const getAllList = async (req, res) => {
  const query = req.query;
  query.deleted = false;
  let allListData = await Loan.find(query)
    .populate({
      path: "createdBy",
      match: { deleted: false }, // Populate only if createBy.deleted is false
    })
    .populate({
      path: "borrowers",
      select: "firstName lastName", // Fetch borrower's details
    })
    .exec();

  const getAllResult = allListData.filter(
    (item) => item.createdBy !== null && item.borrowers !== null
  );
  let totalRecords = getAllResult.length;

  res.send({ getAllResult, count: totalRecords });
};

const getTotalFundDisbursedByMonth = async (req, res) => {
  try {
    const result = await Loan.aggregate([
      {
        $match: {
          deleted: false,
          createdBy: mongoose.Types.ObjectId(req.query.createdBy),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: { $toDate: "$releaseDate" } },
          },
          totalPrincipalAmount: { $sum: "$principleAmount" },
          totalInterestAmount: { $sum: "$interestAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id.month", 1] }, then: "Jan" },
                { case: { $eq: ["$_id.month", 2] }, then: "Feb" },
                { case: { $eq: ["$_id.month", 3] }, then: "Mar" },
                { case: { $eq: ["$_id.month", 4] }, then: "Apr" },
                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                { case: { $eq: ["$_id.month", 6] }, then: "Jun" },
                { case: { $eq: ["$_id.month", 7] }, then: "Jul" },
                { case: { $eq: ["$_id.month", 8] }, then: "Aug" },
                { case: { $eq: ["$_id.month", 9] }, then: "Sep" },
                { case: { $eq: ["$_id.month", 10] }, then: "Oct" },
                { case: { $eq: ["$_id.month", 11] }, then: "Nov" },
                { case: { $eq: ["$_id.month", 12] }, then: "Dec" },
              ],
            },
          },
          totalAmount: {
            $sum: ["$totalPrincipalAmount", "$totalInterestAmount"],
          },
        },
      },
    ]).exec();

    res.send(result);
  } catch (error) {
    console.error("Error while fetching totalCollection:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getTotalCollectionAmountsByMonth = async (req, res) => {
  try {
    const result = await Loan.aggregate([
      {
        $match: {
          deleted: false,
          createdBy: mongoose.Types.ObjectId(req.query.createdBy),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: { $toDate: "$releaseDate" } },
          },
          totalRepaymentAmount: { $sum: "$repaymentAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id.month", 1] }, then: "Jan" },
                { case: { $eq: ["$_id.month", 2] }, then: "Feb" },
                { case: { $eq: ["$_id.month", 3] }, then: "Mar" },
                { case: { $eq: ["$_id.month", 4] }, then: "Apr" },
                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                { case: { $eq: ["$_id.month", 6] }, then: "Jun" },
                { case: { $eq: ["$_id.month", 7] }, then: "Jul" },
                { case: { $eq: ["$_id.month", 8] }, then: "Aug" },
                { case: { $eq: ["$_id.month", 9] }, then: "Sep" },
                { case: { $eq: ["$_id.month", 10] }, then: "Oct" },
                { case: { $eq: ["$_id.month", 11] }, then: "Nov" },
                { case: { $eq: ["$_id.month", 12] }, then: "Dec" },
              ],
              default: "Unknown",
            },
          },
          totalRepaymentAmount: 1, // Include totalRepaymentAmount in the projection
        },
      },
    ]).exec();

    res.send(result);
  } catch (error) {
    console.error(
      "Error while fetching total repayment amounts by month:",
      error
    );
    res.status(500).send("Internal Server Error");
  }
};

const getAllLoanStatusCounts = async (req, res) => {
  const { status } = req.params;
  const { createdBy } = req.query;

  try {
    // Assuming `Loan` is your Mongoose model representing the loans collection
    const loans = await Loan.find({
      loanStatus: status,
      createdBy: createdBy, // Filtering by createdBy
      deleted: false,
    }).exec();

    // Get the count of loans with the specified status and createdBy
    const count = await Loan.countDocuments({
      loanStatus: status,
      createdBy: createdBy, // Filtering by createdBy
      deleted: false,
    }).exec();

    res.json({ loans, count });
  } catch (err) {
    console.error("Error retrieving loans:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllLoanCountsSuperadmin = async (req, res) => {
  const { status } = req.params;

  try {
    const loans = await Loan.find({
      loanStatus: status,

      deleted: false,
    }).exec();

    const count = await Loan.countDocuments({
      loanStatus: status,

      deleted: false,
    }).exec();

    res.json({ loans, count });
  } catch (err) {
    console.error("Error retrieving loans:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const add = async (req, res) => {
  try {
    const generateRandomString = () => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return Array.from({ length: 4 }, () =>
        alphabet.charAt(Math.floor(Math.random() * alphabet.length))
      ).join("");
    };

    const generateRandomNumber = () => {
      return Math.floor(1000 + Math.random() * 9000);
    };

    let newLoanNumber = `${generateRandomString()}${generateRandomNumber()}`;
    while (await Loan.findOne({ loanNumber: newLoanNumber })) {
      newLoanNumber = `${generateRandomString()}${generateRandomNumber()}`;
    }

    const addResult = new Loan({
      ...req.body,
      loanNumber: newLoanNumber,
  
      statusHistory: [
        {
          status: req.body.loanStatus,
          changedOn: new Date(),
        },
      ],
    });

    const wallet = await Wallet.findById(addResult.fromAccount);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const principalAmount = addResult.principleAmount;
    wallet.addFunds -= principalAmount;
   
    wallet.transactions.push({
      walletName: wallet.walletName,
      transactionType: "withdrawal",
      amount: principalAmount,
      updatedBalance: wallet.addFunds,
    });
   
    await wallet.save();
    await addResult.save();

    res.status(201).json({
      addResult,
      message: "Loan created and wallet updated successfully",
    });
  } catch (err) {
    console.error("Failed to create Loan and update Wallet:", err);
    res.status(500).json({ error: "Failed to create Loan and update Wallet" });
  }
};


const edit = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;

   
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid or missing ID" });
    }
   

    const objectId = mongoose.Types.ObjectId(id);
    const { loanStatus, ...otherUpdates } = req.body; 

    let updateData = { ...otherUpdates };
 
    
    let additionalUpdates = {};
    if (loanStatus) {
      const loan = await Loan.findById(objectId);
      if (!loan) {
        return res.status(404).json({ error: "Loan not found" });
      }

      
      additionalUpdates = {
        $push: {
          statusHistory: { status: loanStatus, changedOn: new Date() },
        },
      };

     
      updateData.loanStatus = loanStatus;
    }

   
    const result = await Loan.findByIdAndUpdate(
      { _id: objectId },
      {
        $set: updateData,
        ...additionalUpdates,
      },
      { new: true } 
    );

    if (!result) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error("Failed to Update Loan:", err);
    res.status(400).json({ error: "Failed to Update Loan" });
  }
};

const deleteData = async (req, res) => {
  try {
    let deleteData = await Loan.findByIdAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res
      .status(200)
      .json({ message: "Loan Details deleted successfully", deleteData });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

const getTotalLoanGraphData = async (req, res) => {
  const query = req.query;
  query.deleted = false;

  if (query.year && query.month) {
    const year = parseInt(query.year, 10);
    const month = parseInt(query.month, 10);
    query.createdOn = {
      $gte: new Date(year, month - 1, 1),
      $lt: new Date(year, month, 1),
    };
  }

  const allListData = await Loan.aggregate([
    { $match: query },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdByDetails",
      },
    },
    { $unwind: "$createdByDetails" },
    { $match: { "createdByDetails.deleted": false } },
    {
      $group: {
        _id: {
          year: { $year: "$createdOn" },
          month: { $month: "$createdOn" },
          loanStatus: "$loanStatus",
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.loanStatus": 1,
      },
    },
  ]);

  const result = allListData?.map((item) => ({
    year: item._id.year,
    month: item._id.month,
    loanStatus: item._id.loanStatus,
    count: item.count,
  }));

  let totalRecords = allListData?.reduce((acc, curr) => acc + curr.count, 0);

  res.send({ result, totalCount: totalRecords });
};

const getLoanDetails = async (req, res) => {
  try {
    // Get loan ID from URL params
    const loanId = req.params.id;

    const loanDetails = await Loan.findOne({
      _id: loanId,
      deleted: false,
    }).exec();

    // If no loan is found
    if (!loanDetails) {
      return res.status(404).send({ message: "Loan not found" });
    }

    const { landers: landersId, borrowers: borrowersId } = loanDetails;

    const lender = await Landers.findOne(
      { _id: landersId, deleted: false },
      "landersName"
    );

    const borrower = await Borrower.findOne(
      { _id: borrowersId, deleted: false },
      "firstName lastName"
    );

    if (!lender) {
      return res.status(404).send({ message: "Lender not found" });
    }

    // If borrower is not found
    if (!borrower) {
      return res.status(404).send({ message: "Borrower not found" });
    }

    // Attach the lender's and borrower's details to the loan details
    const loanDetailsWithExtras = {
      ...loanDetails.toObject(), // Convert Mongoose document to plain object
      landersName: lender.landersName, // Add lender's name
      borrowerName: `${borrower.firstName} ${borrower.lastName}`, // Add borrower's name
    };

    res.send({ loanDetails: loanDetailsWithExtras });
  } catch (error) {
    console.error("Error fetching loan details:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const roundTo = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

const receivePayment = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid or missing ID" });
    }

    const objectId = mongoose.Types.ObjectId(id);

    let loan = await Loan.findById(objectId);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    const { receiveAmount, paymentType } = req.body;
    if (!receiveAmount || receiveAmount <= 0) {
      return res.status(400).json({ error: "Invalid receive amount" });
    }

    const updatedRepaymentAmount = roundTo(loan.repaymentAmount - receiveAmount, 2);

   
    const totalMonths = loan.loanDuration * 12; 
    const totalPaid = loan.transactionHistory.reduce((sum, txn) => sum + txn.receiveAmount, 0);

    let adjustedReceiveAmount = receiveAmount;

    if (loan.transactionHistory.length === totalMonths - 1) {
      adjustedReceiveAmount = loan.repaymentAmount; 
    }

    const transactionEntry = {
      receiveAmount: adjustedReceiveAmount,
      updatedRepaymentAmount: roundTo(loan.repaymentAmount - adjustedReceiveAmount, 2),
      date: new Date(),
      paymentType: paymentType,
    };

    loan.transactionHistory.push(transactionEntry);

    loan.repaymentAmount = transactionEntry.updatedRepaymentAmount;

    if (loan.repaymentAmount <= 0) {
      loan.repaymentAmount = 0;
      loan.loanStatus = "fullyPaid";

      loan.statusHistory.push({
        status: "fullyPaid",
        changedOn: new Date(),
      });
    }

    let result = await loan.save();

    res.status(200).json({ result });
  } catch (err) {
    console.error("Failed to update loan:", err);
    res.status(400).json({ error: "Failed to update loan" });
  }
};



const getReceivePaymentHistory = async (req, res) => {
  try {
    const loanId = req.params.id;

    if (!loanId || !mongoose.Types.ObjectId.isValid(loanId)) {
      return res.status(400).json({ error: "Invalid or missing loan ID" });
    }

    const loan = await Loan.findById(loanId).select("transactionHistory");

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json({ transactionHistory: loan.transactionHistory });
  } catch (error) {
    console.error("Error fetching loan payment history:", error);
    res.status(500).json({ error: "Failed to fetch loan payment history" });
  }
};

const deleteReceivePaymentHistory = async (req, res) => {
  try {
    const transactionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const loan = await Loan.findOneAndUpdate(
      { "transactionHistory._id": transactionId },
      {
        $pull: { transactionHistory: { _id: transactionId } },
      },
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully", loan });
  } catch (error) {
    console.error("Failed to delete transaction history:", error);
    res.status(500).json({ error: "Failed to delete transaction history" });
  }
};

const getBorrowersAllLoansDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Borrower ID is required." });
    }

    const loans = await Loan.find({
      borrowers: mongoose.Types.ObjectId(id),
      deleted: false,
    })
      .populate({
        path: "createdBy",
        match: { deleted: false }, // Ensure the borrower is not deleted
      })
      .populate({
        path: "landers", // Populate the lender details
        select: "landersName", // Only fetch the lender's name
      })
      .exec();

    const filteredLoans = loans.filter((loan) => loan.createdBy !== null);

    res.send({
      loans: filteredLoans,
      count: filteredLoans.length,
    });
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).send({ message: "Server error while fetching loans." });
  }
};

const getBorrowersAllLoanOffers = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Borrower ID is required." });
    }

    // Step 1: Fetch all loans associated with the borrower
    const loans = await Loan.find({
      borrowers: mongoose.Types.ObjectId(id), // Match borrower's ID
      deleted: false,
    }).select("loanOffer loanNumber createdBy deleted"); // Fetch relevant fields only

    if (!loans.length) {
      return res
        .status(404)
        .send({ message: "No loans found for the borrower." });
    }

    // Step 2: Extract loanOffer IDs and loanNumbers
    const loanDetails = loans
      .map((loan) => ({
        loanNumber: loan.loanNumber,
        loanOffer: loan.loanOffer,
      }))
      .filter((detail) => detail.loanOffer); // Filter out loans without a loanOffer

    if (!loanDetails.length) {
      return res.status(404).send({
        message: "No loan offers associated with the borrower's loans.",
      });
    }

    // Extract loanOffer IDs for fetching loan offers
    const loanOfferIds = loanDetails.map((detail) => detail.loanOffer);

    // Step 3: Fetch loan offer details using the loanOffer IDs
    const loanOffersData = await LoanOffers.find({
      _id: { $in: loanOfferIds }, // Match loan offer IDs
    }).exec();

    if (!loanOffersData.length) {
      return res.status(404).send({ message: "No loan offer details found." });
    }

    // Step 4: Merge loanNumber into loan offer details
    const loanOffers = loanDetails
      .map((detail) => {
        const loanOfferData = loanOffersData.find(
          (offer) => offer._id.toString() === detail.loanOffer.toString()
        );
        return loanOfferData
          ? {
              loanNumber: detail.loanNumber, // Directly include loanNumber in the response
              ...loanOfferData.toObject(), // Spread loan offer data into the response object
            }
          : null;
      })
      .filter(Boolean); // Remove null values for unmatched loan offers

    // Step 5: Structure the response
    res.send({
      borrowerId: id,
      loanOffers,
      loanOfferCount: loanOffers.length,
    });
  } catch (error) {
    console.error("Error fetching loan offers:", error);
    res
      .status(500)
      .send({ message: "Server error while fetching loan offers." });
  }
}
const getLoanTimeline = async (req, res) => { 
 
  try {
    const { id} = req.params;
   
    const loans = await Loan.find({ borrowers:id })
      .select("loanNumber statusHistory loanStatus")
      .lean();

    if (!loans.length) {
      return res.status(404).json({ error: "No loans found for this borrower" });
    }

    res.status(200).json({ loans });
  } catch (error) {
    console.error("Error fetching loan timeline:", error);
    res.status(500).json({ error: "Failed to fetch loan timeline" });
  }
};

module.exports = {
  getAllList,
  getAllLoanStatusCounts,
  getTotalCollectionAmountsByMonth,
  getTotalFundDisbursedByMonth,
  getAllLoanCountsSuperadmin,
  add,
  edit,
  deleteData,
  getTotalLoanGraphData,
  getLoanDetails,
  receivePayment,
  getReceivePaymentHistory,
  deleteReceivePaymentHistory,
  getBorrowersAllLoansDetails,
  getBorrowersAllLoanOffers,
  getLoanTimeline
}
