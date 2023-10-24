let productController = module.exports;


productController.getAllproducts = async ( req, res) => {
    try{ 
        console.log("GET: cont/getAllproducts"); 
                   

    }catch(err) {
        console.log(`ERORR, cont/getAllproducts ${err.message}`);
        res.json({state: 'fail', message: err.message});
    }
};

productController.addNewProduct = async ( req, res) => {
    try{ 
        console.log("POST: cont/addNewProduct"); 
           console.log(req.number);     
           res.send('ok');   

    }catch(err) {
        console.log(`ERORR, cont/addNewProduct ${err.message}`);
   
    }
};

productController.updateChosenProduct = async ( req, res) => {
    try{ 
        console.log("POST: cont/updateChosenProduct "); 
                   

    }catch(err) {
        console.log(`ERORR, cont/updateChosenProduct  ${err.message}`);
      
    }
};