const { Router } = require("express");

const LoanType = require("../controllers/loanType");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, LoanType.getAllList);
router.put("/edit/:id", auth, LoanType.edit);
router.delete("/delete/:id", auth, LoanType.deleteData);
router.post("/add", auth, LoanType.add);

module.exports =  router;
