var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 2,
      unique: true,
    },
    adressId:{ type: mongoose.SchemaTypes.ObjectId,
      ref: "adresses",},
    password: {
      type: String,
      required: true,
      minlength: 2,
    },
    gender: {
      type: String,
    },
    isProductManager: {
      type: Boolean,
      default: false,
    },
    isSalesManager: {
      type: Boolean,
      default: false,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
