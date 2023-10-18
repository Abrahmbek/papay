const express = require("express");                      //express ni chaqirib olyapmiz      
const app = express();                             // app ga express ni tenglab olyapmiz
const router = require("./router.js");  
const router_bssr = require("./router_bssr.js");  


                                    
//1: Kirish code
app.use(express.static("public"));                  //  routing ichidagi public file ni serverga ulanga klient larga ochib beryapmiz
app.use(express.json());                       // kirib kelayotgan malumotlarni express json formatdan object formatiga  aylantirib olyapmiz
app.use(express.urlencoded({extended: true}));   // traditional frontend nni post qilib otkazib yuboryapti

// 2: Session code
// 3: Views code

 app.set("views",   "views");                     // frontend file larni viewa orqali topasan deyapmiz 
 app.set("view engine",  "ejs",);                //frontend ni ejs orqali qurishni aytyapmiz


// 4 Routing code


app.use("/resto", router_bssr);    // ananaviy method 
app.use("/", router);       // xar qanday kelgan requestlarni router file ga yubor






module.exports = app;