const { Router } = require("express");

const LoanAgreement = require("../controllers/loanAgreement");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/list", auth, LoanAgreement.getAllList);
router.put("/edit/:id", auth, LoanAgreement.edit);
router.delete("/delete/:id", auth, LoanAgreement.deleteData);
router.post("/add", auth, LoanAgreement.add);

module.exports = router;
