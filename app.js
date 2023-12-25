const express = require("express");  
const path = require("path");                    //express ni chaqirib olyapmiz      
const app = express();                             // app ga express ni tenglab olyapmiz
const router = require("./router.js");  
const router_bssr = require("./router_bssr.js"); 
const cookieParser = require("cookie-parser"); 
const cors = require('cors');
let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "sessions",
});
                                    
//1: Kirish code
app.use(express.static("public"));
app.use("uploads", express.static(__dirname + "/uploads") );                  //  routing ichidagi public file ni serverga ulanga klient larga ochib beryapmiz
app.use(express.json());                       // kirib kelayotgan malumotlarni express json formatdan object formatiga  aylantirib olyapmiz
app.use(express.urlencoded({extended: true}));   // traditional frontend nni post qilib otkazib yuboryapti
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: true,
    })
);


// 2: Session code

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 *60 * 30, // for 30 min
        },
        store: store,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(function(req, res, next) {
    res.locals.member = req.session.member;   // sesssiondadi datan i localga yuklab olyapmiz
    next();
});

// 3: Views code

 app.set("views",   "views");                     // frontend file larni viewa orqali topasan deyapmiz 
 app.set("view engine",  "ejs",);    


       //frontend ni ejs orqali qurishni aytyapmiz


// 4 Routing code


app.use("/resto", router_bssr);    // ananaviy method 
app.use("/", router);       // xar qanday kelgan requestlarni router file ga yubor






module.exports = app;