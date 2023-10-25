const Member = require("../models/Member");    //backend ichida frontend qurilyapti

let restaurantController = module.exports;   // bitta object yasb olib unga tenglashtirib qoyamiz

restaurantController.getMyRestaurantData = async (req, res) => {     //get orqali signup page ga borish 
    try{ 
        console.log("GET: cont/getMyRestaurantData"); 
          // TODO: get my restuarant product                               
       
          res.render('restaurant-menu');
    }catch(err) {
        console.log(`ERORR, cont/getMyRestaurantData ${err.message}`);
        res.json({state: 'fail', message: err.message});
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
    console.log("POST: cont/signup");       //routerdan kirib kelayotkan request turi post
    const data = req.body,               //requestni body qismidan malumot olamiz
    member = new Member(),
     new_member = await member.signupData(data);       //data ni yuboramiz

     req.session.member = new_member;
     res.redirect('/resto/products/menu');
    
   }catch (err) {
     console.log(`ERORR, cont/signup ${err.message}`);
     res.json({state: 'fail', message: err.message});
   }


};

restaurantController.getLoginMyRestaurant = async (req, res) => {     //login orqali login page ga borish uchun
    try{ 
        console.log("GET: cont/getLoginMyRestaurantt"); 
        res.render('login');             ////bu qismida bizga render qilib login page ni berishi kerak

    }catch(err) {
        console.log(`ERORR, cont/getLoginMyRestaurant ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
}


restaurantController.loginProcess = async (req, res) => {
    try {
        console.log("POST: cont/login");
        const data = req.body,
         member = new Member(),
          result = await member.loginData(data);
          
          req.session.member = result;
          req.session.save(function() {
            res.redirect('/resto/products/menu');
          });
   
       }catch (err) {
         console.log(`ERORR, cont/login ${err.message}`);
         res.json({state: 'fail', message: err.message});
       }
};

restaurantController.logout = (req, res) => {
    console.log("Get cont.logout");
    res.send("logout page");
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