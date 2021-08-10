var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    productManager: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: true,
    },
    commentId: { type: mongoose.SchemaTypes.ObjectId, ref: "comments" },
    name: String,
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    newprice: { type: Number, required: true },
    rate: Number,
    image: [String],
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "user" },
    countInStock: { type: Number, required: true },
    size: [Number],
    gender: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
