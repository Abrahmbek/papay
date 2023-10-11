const express = require("express");                      //express ni chaqirib olyapmiz      
const app = express();                             // app ga express ni tenglab olyapmiz



// MongoDB call
 
 const db = require("./server").db();           // mongo db ni chaqirib olyapmiz  client ni ichida db ni olyapmiz   
const mongodb = require("mongodb");          // newmongodb ichida id bor oshaning uchun bia qaytadan require qilib oldik


//1: Kirish code
app.use(express.static("public"));                  //  routing ichidagi public file ni serverga ulanga klient larga ochib beryapmiz
app.use(express.json());                       // kirib kelayotgan malumotlarni express json formatdan object formatiga  aylantirib olyapmiz
app.use(express.urlencoded({extended: true}));   // traditional frontend nni post qilib otkazib yuboryapti

// 2: Session code
// 3: Views code

 app.set("views",   "views");                     // frontend file larni viewa orqali topasan deyapmiz 
 app.set("view engine",  "ejs",);                //frontend ni ejs orqali qurishni aytyapmiz


// 4 Routing code
module.exports = app;