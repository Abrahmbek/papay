const Member = require("../models/Member");

let restaurantController = module.exports;   // bitta object yasb olib unga tenglashtirib qoyamiz

restaurantController.getSignupMyRestaurant = async (req, res) => {
    try{ 
        console.log("GET: cont/getSignupMyRestaurant"); 
        res.render('signup');

    }catch(err) {
        console.log(`ERORR, cont/getSignupMyRestaurant ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
}

restaurantController.signupProcess = async (req, res) => {
   try {
    console.log("POST: cont/signup");       //routerdan kirib kelayotkan request turi post
    const data = req.body,               //requestni body qismidan malumot olamiz
    member = new Member(), new_member = await member.signupData(data);       //data ni yuboramiz

    res.json({state: 'succeed', data: new_member});
   }catch (err) {
     console.log(`ERORR, cont/signup ${err.message}`);
     res.json({state: 'fail', message: err.message});
   }


};

restaurantController.getLoginMyRestaurant = async (req, res) => {
    try{ 
        console.log("GET: cont/getLoginMyRestaurantt"); 
        res.render('signup');

    }catch(err) {
        console.log(`ERORR, cont/getLoginMyRestaurant ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
}


restaurantController.loginProcess = async (req, res) => {
    try {
        console.log("POST: cont/login");
        const data = req.body,
         member = new Member(), result = await member.loginData(data);
    
        res.json({state: 'succeed', data: result});
       }catch (err) {
         console.log(`ERORR, cont/login ${err.message}`);
         res.json({state: 'fail', message: err.message});
       }
};

restaurantController.logout = (req, res) => {
    console.log("Get cont.logout");
    res.send("logout page");
};