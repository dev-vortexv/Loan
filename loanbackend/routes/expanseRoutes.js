const { Router } = require("express");

const Expanses = require("../controllers/expanses");
const { upload } = require("../utils/upload");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/list", auth, Expanses.getAllList);
router.put("/edit/:id", auth, upload.single("file"), Expanses.edit);
router.delete("/delete/:id", auth, Expanses.deleteData);
router.post("/add", auth, upload.single("file"), Expanses.add);
router.get("/businessExpanses", auth, Expanses.getAllBusinessExpenses);

module.exports = router;
