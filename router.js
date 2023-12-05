const express = require("express"); 
const router = express.Router();      //exprees ni ichidan routerni olob chiqamiz       //turli xil api larni addresslari qaysi api bilan kelgan addresslarni qayerga borishini xal qiladi 
const memberController = require('./contollers/memberControllers');
const productController = require('./contollers/productController');

/************************************************
 *              REST API          * 
 **********************************************/



//member routers

router.post("/sign-up", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthantication);
router.get("/member/:id",
memberController.retrieveAuthMember,
memberController.getChosenMember);


//other routers
router.post("/products",
memberController.retrieveAuthMember,
productController.getAllProducts);

router.get("/products/:id",
memberController.retrieveAuthMember,
productController.getChosenProducts
 );


// router.get("/menu", (req, res) => {
//     res.send("menu page");
// });

// router.get("/community", (req, res) => {
//     res.send("coomunity page");
// });
module.exports = router;