const dotenv =require("dotenv");
dotenv.config();

const http = require( "http");    // http ni require qilib talab qilib oldik
const mongoose = require("mongoose").default;       // mongo db ni talab qilib qilib oldik
mongoose.set("strictQuery", false);
                 
const connectionString = process.env.MONGO_URL;     //  mongo db ga kalit ulanish kodi
   


mongoose.connect(                        //mongo db ni 3 xil yol bilan elon qilib oldik 
    connectionString,                    //mongo db ni connect methodni 3 ta qiymat qabul qilyapti
    {
        useNewUrlParser: true,               // docs da gi bilan bir hil 
        useUnifiedTopology: true,
    },
    (err, goose) => {                                             //callback function chaqiramiz agar error bolsa bizga errorni korsat
        if(err) console.log("ERROR on connection MongoDB ");         
        else {                                                    // aks holda mongo db ga ulansin
            console.log("Mongo connection succeed");       
             //console.log(goose);                                                   
            const app = require("./app");                  // app js ni sorab oldik shu yerda ishga tushiryapmiz
            const server = http.createServer(app);             // http server yartib ichida app ni chaqirib olyapmiz
            let PORT = process.env.PORT || 3003;                                    //port 3000 da korsat deyapmiz
           
            server.listen(PORT, function() {                   
                console.log(
                    `the server is running successfully on port: ${PORT}, http://localhost:${PORT}`
                );
            });

        }
    }
);