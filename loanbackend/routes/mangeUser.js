const { Router } = require("express");

const ManageUser = require("../controllers/manageUser");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, ManageUser.getAllList);
router.put("/edit/:id", auth, ManageUser.edit);
router.delete("/delete/:id", auth, ManageUser.deleteData);
router.post("/add", auth, ManageUser.add);

module.exports = router;
