const Member = require("../models/Member");

let memberController = module.exports;   // bitta object yasb olib unga tenglashtirib qoyamiz



memberController.signup = async (req, res) => {
   try {
    console.log("POST: cont/sinup");
    const data = req.body,
    member = new Member(), new_member = await member.signupData(data);

    res.json({state: 'succeed', data: new_member});
   }catch (err) {
     console.log(`ERORR, cont/signup`);
     res.json({state: 'fail', message: err.message});
   }


};

memberController.login = async (req, res) => {
    try {
        console.log("POST: cont/login");
        const data = req.body,
         member = new Member(), result = await member.loginData(data);
    
        res.json({state: 'succeed', data: result});
       }catch (err) {
         console.log(`ERORR, cont/signup`);
         res.json({state: 'fail', message: err.message});
       }
};

memberController.logout = (req, res) => {
    console.log("Get cont.logout");
    res.send("logout page");
};