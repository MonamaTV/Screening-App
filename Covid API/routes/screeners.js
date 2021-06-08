const express = require("express");
const router = express.Router();

const { isAdmin } = require("./protectRoutes");
const { getScreeners,
        getScreenerById, 
        registerScreener, 
        updateScreener } = require("../controllers/screeners");

//Only 
router.get("/", getScreeners);
//Only admin must make this request, or the owner of the info
router.get("/:screenerID", getScreenerById);
// Register
router.post("/register", registerScreener);
//update details
router.patch("/:screenerID", updateScreener);

module.exports = router;
