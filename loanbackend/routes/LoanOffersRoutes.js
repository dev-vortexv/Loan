const { Router } = require("express");

const LoanOffers = require("../controllers/loanOffers");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", LoanOffers.getAllList);
router.put("/edit/:id", auth, LoanOffers.edit);
router.delete("/delete/:id", auth, LoanOffers.deleteData);
router.post("/add", auth, LoanOffers.add);

module.exports = router;
