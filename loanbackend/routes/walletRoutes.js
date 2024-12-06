const { Router } = require("express");

const Wallet = require("../controllers/wallet");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/list", auth, Wallet.getAllList);
router.put("/edit/:id", auth, Wallet.edit);
router.delete("/delete/:id", auth, Wallet.deleteData);
router.post("/add", auth, Wallet.add);
router.get("/view/:id", auth, Wallet.getWalletHistoryDetails);
router.delete("/deleteHistory/:id", auth, Wallet.deleteHistoryData);

module.exports = router;
