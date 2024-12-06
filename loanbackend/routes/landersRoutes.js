const { Router } = require("express");

const Landers = require("../controllers/landers");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, Landers.getAllList);
router.put("/edit/:id", auth, Landers.edit);
router.delete("/delete/:id", auth, Landers.deleteData);
router.post("/add", auth, Landers.add);

module.exports = router;
