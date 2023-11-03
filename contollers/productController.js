const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");

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
    
          assert(req.files, Definer.general_err3);  
          
          const product = new Product();
          let data = req.body;

          data.product_images = req.files.map((ele) =>{
            return ele.path;
          });
           
          const result = await product.addNewProductData(data, req.member);
         
          const html = `<script>
                          alert(new dish added successfuly);
                          window.location.replace('/resto/product/menu);
                          </script>`;
         res.end(html);                 
       
    }catch(err) {
        console.log(`ERORR, cont/addNewProduct ${err.message}`);
   
    }
};

productController.updateChosenProduct = async ( req, res) => {
    try{ 
        console.log("POST: cont/updateChosenProduct "); 
           const product = new Product();
           const id = req.params.id;
           const result = await product.updateChosenProductData(id, req.body, req.member._id);
           await res.json({state: "sucess", data: result});  

    }catch(err) {
        console.log(`ERORR, cont/updateChosenProduct  ${err.message}`);
        res.json({state: 'fail', message: err.message});
      
    }
};