const Member = require("../models/Member");    //backend ichida frontend qurilyapti
const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");
const Restaurant = require("../models/Restaurant");

let restaurantController = module.exports;   // bitta object yasb olib unga tenglashtirib qoyamiz

restaurantController.getResrtaurants = async (req, res) => {   // req, res  parametr beryapmiz
  try {
      console.log("GET: cont/getMyRestaurants"); 
      const data = req.query,                      // reqning query qismidan malumotlani olyapmiz   //pagination order limit 
     restaurant = new Restaurant(),                // Restaurant service modeldan instance ovolpmiz
     result = await restaurant.getResrtaurantsData(req.member, data);  //restqaurant object ni ichidan member hosil qilib olamiz va req.member va datani pathi qilamiz 
   res.json({state: 'success', data: result});    //getResrtaurantsData dan qaytkan maulomotlani json formatdda qabul qilib olyapmiz
  } catch(err) {
    console.log(`ERORR, cont/home, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
}

restaurantController.getChosenResrtaurants = async (req, res) => {
  try {
      console.log("GET: cont/getChosenResrtaurants"); 
      const id = req.params.id;
      const restaurant = new Restaurant();
      const result =  await restaurant.getChosenResrtaurantData(req.member, id);    //restqaurant object ni ichidan getChosenResrtaurantData method hosil qilib olyapmiz
      
   res.json({state: 'success', data: result});
  } catch(err) {
    console.log(`ERORR, cont/getChosenResrtaurants, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
}



/************************************************
 *         BSSR RELATED METHOD      * 
 **********************************************/



restaurantController.home =(req, res)  =>{
  try{
   console.log("GET: cont/home");
   res.render('home-page');
  }catch(err) {
    console.log(`ERORR, cont/home, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
};


restaurantController.getMyRestaurantProducts = async (req, res) => {     //get orqali signup page ga borish 
    try{ 
        console.log("GET: cont/getMyRestaurantProducts"); 
          // TODO: get my restuarant product                               
       const product = new Product();    //product objectini product classiga tenglab olyapmiz
       const data = await product.getAllProductsDataResto(res.locals.member);    //router bssrga yozib otirmadikda app.jsda chaqirib ishlatyapmiz
          res.render('restaurant-menu', {restaurant_data: data} );
    }catch(err) {
        console.log(`ERORR, cont/getMyRestaurantProducts ${err.message}`);
     res.redirect("/resto");
    }
}



restaurantController.getSignupMyRestaurant = async (req, res) => {     //get orqali signup page ga borish 
    try{ 
        console.log("GET: cont/getSignupMyRestaurant"); 
        res.render('signup');                                     //bu qismida bizga render qilib signup page ni berishi kerak

    }catch(err) {
        console.log(`ERORR, cont/getSignupMyRestaurant ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
}

restaurantController.signupProcess = async (req, res) => {
   try {
    console.log("POST: cont/signupProcess");       //routerdan kirib kelayotkan request turi post

    
    assert(req.file, Definer.general_err3);  

    let new_member = req.body;                        //requestni body qismidan malumot olamiz
    new_member.mb_type = "RESTAURANT";
    //new_member.mb_image = req.file.path;
    new_member.mb_image = req.file.path.replace(/\\/g, "/");

    const member = new Member();
     const result = await member.signupData(new_member);       //data ni yuboramiz
     assert(result, Definer.general_err1); 

     req.session.member = result;
     res.redirect('/resto/products/menu');
    
   }catch (err) {
     console.log(`ERORR, cont/signupProcess ${err.message}`);
     res.json({state: 'fail', message: err.message});
   }


};

restaurantController.getLoginMyRestaurant = async (req, res) => {     //login orqali login page ga borish uchun
    try{ 
        console.log("GET: cont/getLoginMyRestaurant"); 
        res.render('login');             ////bu qismida bizga render qilib login page ni berishi kerak

    }catch(err) {
        console.log(`ERORR, cont/getLoginMyRestaurant ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
}


restaurantController.loginProcess = async (req, res) => {
    try {
        console.log("POST: cont/loginProcess");
        const data = req.body,
         member = new Member(),
          result = await member.loginData(data);
          
          req.session.member = result;        //session ni ichidan member degan object hosil qilib shunga yuklayapmiz kelgan maluotlani
          req.session.save( () => {              // va session ni ichida save qilyapmiz
           result.mb_type === "ADMIN"
           ? res.redirect('/resto/all-restaurant')
           : res.redirect('/resto/products/menu');
          });
   
       }catch (err) {
         console.log(`ERORR, cont/loginProcess ${err.message}`);
         res.json({state: 'fail', message: err.message});
       }
};

restaurantController.logout = (req, res) => {
  try {  
    console.log("Get cont/logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });


  } catch{
    console.log(`ERORR, cont/logout, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
    
};

restaurantController.validateAuthRestaurant = ( req, res, next) => {
    if ( req.session?.member?.mb_type === "RESTAURANT") {
        req.member = req.session.member;
        next();
    } else res.json({
        state: "fail", 
        message: "only authenticated members with restaurant type",
});
};


restaurantController.checkSessions= (req, res) => {
  if (req.session?.member) {
    res.json({state: "succeed", data: req.session.member});

  } else{
    res.json({state: "fail", message: "you are not authenticated"});
  }
};


restaurantController.validateAdmin = ( req, res, next) => {
  if ( req.session?.member?.mb_type === "ADMIN") {
      req.member = req.session.member;
      next();
  } else {
    
    const html = `<script>
                 alert('Admin page: Permission Denied');
                  window.location.replace('/resto');
               </script>`;
     res.end(html);  
  }
};

restaurantController.getAllRestaurants = async (req, res) => {
  try {
    console.log("Get cont/getAllRestaurants");
   const restaurant = new Restaurant();
    const restaurants_data = await restaurant.getAllRestaurantsData();
       res.render("all-restaurants", {restaurants_data: restaurants_data});

  }catch {
    console.log(`ERORR, cont/getAllRestaurants, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
};


restaurantController.updateRestaurantByAdmin= async (req, res) => {
  try {
    console.log("Get cont/getAllRestaurants");
   const restaurant = new Restaurant();
    const result= await restaurant.updateRestaurantByAdminData(req.body);
   await res.json({state: "success", data: result});
  }catch(err){
    console.log(`ERORR, cont/updateRestaurantByAdmin, ${err.message}`);
    res.json({state: "fail", message: err.message});
  }
};
