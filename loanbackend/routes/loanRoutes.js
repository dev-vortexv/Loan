const { Router } = require("express");

const Loan = require("../controllers/loan");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/list", auth, Loan.getAllList);
router.put("/edit/:id", auth, Loan.edit);
router.delete("/delete/:id", auth, Loan.deleteData);
router.post("/add", auth, Loan.add);
router.get("/list/:status", auth, Loan.getAllLoanStatusCounts);
router.get("/allLoans/:status", auth, Loan.getAllLoanCountsSuperadmin);
router.get("/totalFundDisbursed", auth, Loan.getTotalFundDisbursedByMonth);
router.get("/totalLoanCollection", auth, Loan.getTotalCollectionAmountsByMonth);
router.get("/totalLoanGraph", Loan.getTotalLoanGraphData);
router.get("/view/:id", auth, Loan.getLoanDetails);
router.put("/ReceivePayment/:id", auth, Loan.receivePayment);
router.get("/ReceivedPayment/History/:id", auth, Loan.getReceivePaymentHistory);
router.get("/loanTimeline/:id", auth, Loan.getLoanTimeline);
router.delete(
  "/receivedPayment/deleteHistory/:id",
  auth,
  Loan.deleteReceivePaymentHistory
);

module.exports = router;
