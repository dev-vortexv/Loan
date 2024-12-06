const { Router } = require("express");

const PaymentMethod = require("../controllers/paymentMethod");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, PaymentMethod.getAllList);
router.put("/edit/:id", auth, PaymentMethod.edit);
router.delete("/delete/:id", auth, PaymentMethod.deleteData);
router.post("/add", auth, PaymentMethod.add);

module.exports = router;
