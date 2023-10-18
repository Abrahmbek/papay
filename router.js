const express = require("express"); 
const router = express.Router();      //exprees ni ichidan routerni olob chiqamiz       //turli xil api larni addresslari qaysi api bilan kelgan addresslarni qayerga borishini xal qiladi 
const memberController = require('./contollers/memberControllers');


/************************************************
 *              REST API          * 
 **********************************************/



//member routers

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