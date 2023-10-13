const express = require("express"); 
const router = express.Router(); 
const memberController = require('./contollers/memberControllers');

//member routers
router.get("/", memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);


//other routers
router.get("/menu", (req, res) => {
    res.send("menu page");
});

router.get("/community", (req, res) => {
    res.send("coomunity page");
});
module.exports = router;