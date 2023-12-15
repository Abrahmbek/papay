class Definer  {
    
    //*general error*/
    static general_err1 = "att: something went wrong!";
    static general_err2 = "att: there is no data with that params!";
    static general_err3 = "att: file upload error!";
    
    
    //*member auth releted error*/
    static auth_err1 = "att: mongodb validation is failed";
     static auth_err2 = "att: jwt token creation error";
    static auth_err3 = "att:no member with that mb_nick";
    static auth_err4 = "att: your creddentiol do not match";
     static auth_err5 = "att: your are not authentication";
    //*product releted error*/
    static product_err1 = "att: product creation is failed";

    //*order releted error*/
     static order_err1 = "att: order creation is failed!";
     static order_err2 = "att: order item creation is failed!";
       static order_err3 = "att: no order with thar params exist!";

       //*Articles releted error*/
       static article_err1 = "att: author member for article not provided!";
        static article_err2 = "att: no article found for that member !";
         static article_err3 = "att: no articles found for that target !";

         //*Follow releted error*/
       static follow_err1 = "att: self subscribtion is denied!";
      static follow_err2 = "att: new follow subscription is failed!";
       static follow_err3 = "att: no follow data found!";
} 


module.exports = Definer;