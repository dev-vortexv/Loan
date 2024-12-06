const { Router } = require("express");

const LoanSettlement = require("../controllers/loanSettlement");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, LoanSettlement.getAllList);
router.put("/edit/:id", auth, LoanSettlement.edit);
router.delete("/delete/:id", auth, LoanSettlement.deleteData);
router.post("/add", auth, LoanSettlement.add);

module.exports = router;
