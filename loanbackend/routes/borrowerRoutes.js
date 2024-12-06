const { Router } = require("express");
const Borrowers = require("../controllers/borrowers");
const { uploadDocuments } = require("../utils/upload");
const auth = require("../middlewares/auth");
const Loan = require("../controllers/loan");

const router = Router();

router.get("/list", auth, Borrowers.getAllBorrowersList);
router.put(
  "/edit/:id",
  auth,
  uploadDocuments.fields([{ name: "bankStatement" }]),
  Borrowers.edit
);
router.delete("/delete/:id", auth, Borrowers.deleteData);
router.post(
  "/add",
  auth,
  uploadDocuments.fields([{ name: "bankStatement" }]),
  Borrowers.add
);
router.get("/view/:id", auth, Borrowers.viewBorrowersDetails);
router.get("/loan/:id", auth, Loan.getBorrowersAllLoansDetails);
router.get("/loanOffers/:id", auth, Loan.getBorrowersAllLoanOffers);
router.post(
  "/documents/:id",
  auth,
  uploadDocuments.fields([{ name: "file" }]),
  Borrowers.addBorrowersDocuments
);
router.get("/documentsList/:id", auth, Borrowers.getBorrowersAllDocuments);
router.delete("/documentsDelete/:id", auth, Borrowers.deleteBorrowerDocuments);
router.put(
  "/documentsEdit/:id",
  auth,
  uploadDocuments.fields([{ name: "file" }]),
  Borrowers.editBorrowerDocuments
);

module.exports = router;
