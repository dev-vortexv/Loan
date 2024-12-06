const { Router } = require("express");

const ExpanseCategories = require("../controllers/expanseCategories");
const auth = require("../middlewares/auth");

const router = Router();

router.get("/list", auth, ExpanseCategories.getAllList);
router.put("/edit/:id", auth, ExpanseCategories.edit);
router.delete("/delete/:id", auth, ExpanseCategories.deleteData);
router.post("/add", auth, ExpanseCategories.add);

module.exports = router;
