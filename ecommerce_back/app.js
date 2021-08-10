var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./helper/db")();
var app = express();
const crypto = require("crypto"); //to generate file name
app.use(bodyParser.json());
var fs = require("fs");
app.set("view engine", "handlebars");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // if (req.method === "OPTIONS") {
  //   res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  //   return res.status(200).json({});
  // }
  next();
});
// const multer = require("multer");

// var Storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./public/images");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//   },
// });

// var upload = multer({
//   storage: Storage,
// }).single("image"); //Field name and max count

// app.use(express.static('public/images'));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });
//
const morgan = require("morgan");
app.use(morgan("devStart"));
app.use( express.static('src'));
app.use( express.static(__dirname + '/src'));
app.use( express.static(__dirname + '/images'));
app.use( express.static(__dirname + './images'));




/////ROUTES//////////
var loginRouter = require("./routes/login");
app.use("/login", loginRouter);

var registerRouter = require("./routes/register");
app.use("/register", registerRouter);

var changePasswordRouter = require("./routes/changePassword");
app.use("/changePassword", changePasswordRouter);

var authRoutes = require("./routes/auth");
app.use("/activateEmail", authRoutes);



var productRouter = require("./routes/product");
app.use("/product", productRouter);

var basketRouter = require("./routes/basket");
app.use("/basket", basketRouter);

var orderRouter = require("./routes/order");
app.use("/order", orderRouter);

var adressRouter = require("./routes/adress");
app.use("/adress", adressRouter);

var commentRouter = require("./routes/comment");
app.use("/comment", commentRouter);

var userRouter = require("./routes/user");
app.use("/user", userRouter);

// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
//   // render the error page
//   res.status(err.status || 500);
//   console.log(err);
//   res.json({ error: "error" });
// });

// const moesif = require('moesif-nodejs');

// const moesifMiddleware = moesif({
//   applicationId: 'eyJhcHAiOiIxOTg6NzIwIiwidmVyIjoiMi4wIiwib3JnIjoiODg6MTI2MSIsImlhdCI6MTYwOTQ1OTIwMH0.1dK6zn1-DvOHOVZhtXAmHQukHzj9-qKg8YG9SmJgxoU',

//   identifyUser: function (req, res) {
//     return req.user ? req.user.id : undefined;
//   },
// });

// app.use(moesifMiddleware);


// moesifMiddleware.startCaptureOutgoing();
// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

app.listen(5008, () => {
  console.log("Server listening on port 5008");
});

module.exports = app;
