const express = require("express"); 
const router = express.Router();      //exprees ni ichidan routerni olob chiqamiz       //turli xil api larni addresslari qaysi api bilan kelgan addresslarni qayerga borishini xal qiladi 
const memberController = require('./contollers/memberControllers');
const productController = require('./contollers/productController');
const restaurantController = require('./contollers/restaurantController');
const orderController = require('./contollers/orderController');
const communityController = require('./contollers/communityController');
const followController = require('./contollers/followController');
const uploader_community = require('./utils/upload-multer')('community');
const uploader_member = require('./utils/upload-multer')('members');
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

router.post("/orders/edit",
memberController.retrieveAuthMember,
orderController.editChosenOrder
);

// community releated routers

router.post("/community/image",
uploader_community.single('community_image'),
 communityController.imageInsertion
);


router.post("/community/create",
memberController.retrieveAuthMember,
 communityController.createArticle
);

router.get("/community/articles",
memberController.retrieveAuthMember,
 communityController.getMemberArticles
);

router.get("/community/target",
memberController.retrieveAuthMember,
 communityController.getArticles
);

router.get("/community/single-article/:art_id",
memberController.retrieveAuthMember,
 communityController.getChosenArticles
);

// Following releated routers

router.post("/follow/subscribe",
memberController.retrieveAuthMember,
 followController.subscribe
);


router.post("/follow/unsubscribe",
memberController.retrieveAuthMember,
 followController.unsubscribe
);

router.get("/follow/followings",
 followController.getMemberFollowings
);

router.get("/follow/followers",
memberController.retrieveAuthMember,
 followController.getMemberFollowers
);


module.exports = router;