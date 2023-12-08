
const Order = require("../models/Order");

let orderController = module.exports;   // bitta object yasb olib unga tenglashtirib qoyamiz
 const jwt = require("jsonwebtoken");
const Definer = require("../lib/mistake");
const assert = require("assert");


orderController.createOrder = async (req, res) => {
   try {
    console.log("POST: cont/createOrder");       //routerdan kirib kelayotkan request turi post
    assert.ok(req.member, Definer.auth_err5);
  
    const order = new Order();
   const  result = await order.createOrderData(req.member, req.body);

    res.json({state: 'succeed', data: result});
   }catch (err) {
     console.log(`ERORR, cont/createOrder ${err.message}`);
     res.json({state: 'fail', message: err.message});
   }


};

