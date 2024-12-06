const { Router } = require("express");

const Currency = require("../controllers/currency");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, Currency.getAllList);
router.put("/edit/:id", auth, Currency.edit);
router.delete("/delete/:id", auth, Currency.deleteData);
router.post("/add", auth, Currency.add);

module.exports = router;
