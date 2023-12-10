let communityController = module.exports;

const Definer = require("../lib/mistake");
const assert = require("assert");
const Community = require("../models/Community");


communityController.imageInsertion = async (req, res) => {
      try{
     console.log("POST: cont/imageInsertion");   
   assert.ok(req.file, Definer.general_err3);
   const image_url = req.file.path;

    res.json({state: 'succeed', data: image_url});
  }catch(err){
     console.log(`ERORR, cont/imageInsertion ${err.message}`);
     res.json({state: 'fail', message: err.message});
  }
};
communityController.createArticle = async (req, res) => {
      try{
     console.log("POST: cont/createArticle");   
  
   
   const community = new Community();
   const result = await  community.createArticleData(req.member, req.body);
   assert.ok(result, Definer.general_err3);

    res.json({state: 'succeed', data: result});
  }catch(err){
     console.log(`ERORR, cont/createArticle ${err.message}`);
     res.json({state: 'fail', message: err.message});
  }
};