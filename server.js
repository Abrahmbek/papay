const dotenv =require("dotenv");
dotenv.config();

const http = require( "http");    // http ni require qilib talab qilib oldik
const mongoose = require("mongoose");       // mongo db ni talab qilib qilib oldik

                 
const connectionString = process.env.MONGO_URL;     //  mongo db ga kalit ulanish kodi
   


mongoose.connect(                        //mongo db ni 3 xil yol bilan elon qilib oldik 
    connectionString,                    //mongo db ni connect methodni 3 ta qiymat qabul qilyapti
    {
        useNewUrlParser: true,               // docs da gi bilan bir hil 
        useUnifiedTopology: true,
    })
    .then(() => {                                             //callback function chaqiramiz agar error bolsa bizga errorni korsat
         console.log("ERROR on connection MongoDB ",);         
                                                      // aks holda mongo db ga ulansin
                                                              // client ni ornida  "data " yozsa ham boladi bu yerda client yozilgan
         const app = require("./app");                  // app js ni sorab oldik shu yerda ishga tushiryapmiz
            const server = http.createServer(app);             // http server yartib ichida app ni chaqirib olyapmiz
            let PORT = process.env.PORT || 3003;                                    //port 3000 da korsat deyapmiz
           
            server.listen(PORT, function() {                   
                console.log(  `the server is running successfully on port: ${PORT}, http://localhost:${PORT}`)
                 });
            })

        .catch((err) => {
            console.log("Eroor on connection to Mongodb", err);     
    });