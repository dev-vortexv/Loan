const { Router } = require("express");

const Roles = require("../controllers/roles");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, Roles.getAllList);
router.put("/edit/:id", auth, Roles.edit);
router.delete("/delete/:id", auth, Roles.deleteData);
router.post("/add", auth, Roles.add);

module.exports = router;
