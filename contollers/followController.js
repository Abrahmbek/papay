let = followController = module.exports;

const Definer = require("../lib/mistake");
const assert = require("assert");
const Follow = require("../models/Follow");


followController.subscribe = async (req, res) => {
      try{
     console.log("POST: cont/subscribe" );   
   assert.ok(req.member, Definer.auth_err5);
  
   const follow = new Follow();
   await follow.subscribeData(req.member, req.body);

     res.json({state: 'succeed', data: "subscribed"});
  }catch(err){
     console.log(`ERORR, cont/subscribe  ${err.message}`);
     res.json({state: 'fail', message: err.message});
  }
};