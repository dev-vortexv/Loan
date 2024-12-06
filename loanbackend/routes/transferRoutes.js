const { Router } = require("express");

const Transfer = require("../controllers/transfers");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, Transfer.getAllList);
router.put("/edit/:id", auth, Transfer.edit);
router.delete("/delete/:id", auth, Transfer.deleteData);
router.post("/add", auth, Transfer.add);

module.exports = router;

