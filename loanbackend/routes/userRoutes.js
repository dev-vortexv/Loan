const { Router } = require("express");
const Users = require("../controllers/users");
const router = Router();

router.get("/getAllUser", Users.getUserList);
router.get("/view/:id", Users.view);
router.put("/edit/:id", Users.edit);
router.delete("/delete/:id", Users.deleteData);
router.post("/register", Users.register);
router.post("/login", Users.login);

module.exports = router;
