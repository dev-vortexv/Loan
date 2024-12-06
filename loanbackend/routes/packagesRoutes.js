const { Router } = require("express");

const Package = require("../controllers/packages");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, Package.getList);
router.post("/add", auth, Package.add);
router.put("/edit/:id", auth, Package.edit);
router.delete("/delete/:id", auth, Package.deleteData);

module.exports = router;
