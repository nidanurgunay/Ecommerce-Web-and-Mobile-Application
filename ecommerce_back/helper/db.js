var mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/ecommercedb", { useUnifiedTopology: true, useNewUrlParser: true ,useCreateIndex: true})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error"));
};
