const { Router } = require("express");

const Repayments = require("../controllers/repayments");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/list", auth, Repayments.getAllList);
router.put("/edit/:id", auth, Repayments.edit);
router.delete("/delete/:id", auth, Repayments.deleteData);
router.post("/add", auth, Repayments.add);

module.exports = router;

