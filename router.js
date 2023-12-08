const express = require("express"); 
const router = express.Router();      //exprees ni ichidan routerni olob chiqamiz       //turli xil api larni addresslari qaysi api bilan kelgan addresslarni qayerga borishini xal qiladi 
const memberController = require('./contollers/memberControllers');
const productController = require('./contollers/productController');
const restaurantController = require('./contollers/restaurantController');
const orderController = require('./contollers/orderController');
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

//  Restaurant related routers
router.get("/restaurants",
memberController.retrieveAuthMember,     // kim mana shu resto larga zapros beryapti? shuni bilish uchun qaysi restolarga like bosigan shun bilish uchun 
restaurantController.getResrtaurants         //yangi method hosil qilamiz
 );

 router.get("/restaurants/:id",
memberController.retrieveAuthMember,      // kim mana shu resto larga zapros beryapti? shuni bilish uchun qaysi restolarga like bosigan shun bilish uchun 
restaurantController.getChosenResrtaurants
 );


 //Order related routers

 router.post("/orders/create",
memberController.retrieveAuthMember,
orderController.createOrder
);

router.get("/orders",
memberController.retrieveAuthMember,
orderController.getMyOrders
);

module.exports = router;