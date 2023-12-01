const assert = require("assert");
const Member = require("../models/Member");

let memberController = module.exports;   // bitta object yasb olib unga tenglashtirib qoyamiz
 const jwt = require("jsonwebtoken");
const Definer = require("../lib/mistake");


memberController.signup = async (req, res) => {
   try {
    console.log("POST: cont/signup");       //routerdan kirib kelayotkan request turi post
    const data = req.body,               //requestni body qismidan malumot olamiz
    member = new Member(),
     new_member = await member.signupData(data);       //data ni yuboramiz

 
      const token = memberController.createToken(new_member);
    

     res.cookie("access_token", token,
     {maxAge:6 * 3600 * 1000, 
      httpOnly: true});


    res.json({state: 'succeed', data: new_member});
   }catch (err) {
     console.log(`ERORR, cont/signup ${err.message}`);
     res.json({state: 'fail', message: err.message});
   }


};

memberController.login = async (req, res) => {
    try {
        console.log("POST: cont/login");
        const data = req.body,
         member = new Member(), result = await member.loginData(data);
    
      const token = memberController.createToken(result);
       

     res.cookie("access_token", token,
     {maxAge:6 * 3600 * 1000, 
      httpOnly: true});

        res.json({state: 'succeed', data: result});
       }catch (err) {
         console.log(`ERORR, cont/login ${err.message}`);
         res.json({state: 'fail', message: err.message});
       }
};

memberController.logout = (req, res) => {
    console.log("Get cont.logout");
    res.send("logout page");
};


memberController.createToken = (result) => {

  try{
    const upload_data= {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type
    };

    const token = jwt.sign(
      upload_data, 
      process.env.SECRET_TOKEN,{
        expiresIn: "6h",
      });

      assert.ok(token, Definer.auth_err2);
     return token;
  }catch(err) {
    throw err;
  }
};

memberController.checkMyAuthantication = (req, res) => {

  try{
      console.log("Get cont/checkMyAuthantication");
     let token = req.cookies["access_token"];

    const member = token ?jwt.verify(
      token, 
      process.env.SECRET_TOKEN) : null;
     assert.ok(member, Definer.auth_err2);
     
     res.json({state: 'succeed', data: member});
     return token;
  }catch(err) {
    throw err;
  }
};