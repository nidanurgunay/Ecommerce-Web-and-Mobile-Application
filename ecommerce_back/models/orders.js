var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
  email:String,
  status:{type:String,
    enum: ['ordered', 'on the way', 'shipped']},
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
  },
  email:{
    type:String,
  },
  basket: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "baskets",
  },
  address: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "adresses",
  },
  addresss: {
    type:String,
  },
  creditCardNo: String,
  cvv: String,
  creditExpirationDate:String, // date nasıl ona bakın...


} ,{ timestamps: true });
module.exports = mongoose.model("order", orderSchema);

