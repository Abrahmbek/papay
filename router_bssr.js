const express = require("express"); 
const router_bssr = express.Router();      //exprees ni ichidan routerni olob chiqamiz       //turli xil api larni addresslari qaysi api bilan kelgan addresslarni qayerga borishini xal qiladi 
const restaurantController = require('./contollers/restaurantController');
const productController = require('./contollers/productController');
const uploader_product = require("./utils/upload-multer")("products");

/************************************************
 *              BSSR EJS          * 
 **********************************************/

router_bssr.get("/", restaurantController.home);              // restaurantController orqali home degan method yozamiz


router_bssr
.get("/sign-up", restaurantController.getSignupMyRestaurant)
.post("/sign-up", restaurantController.signupProcess);

router_bssr
.get("/login", restaurantController.getLoginMyRestaurant)
.post("/login", restaurantController.loginProcess);

router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

router_bssr.get("/products/menu", restaurantController.getMyRestaurantProducts);
router_bssr.post("/products/create",
restaurantController.validateAuthRestaurant,
uploader_product.array("product_images", 5),
productController.addNewProduct);

router_bssr.post("/products/edit/:id",
restaurantController.validateAuthRestaurant,
 productController.updateChosenProduct); 

module.exports = router_bssr;