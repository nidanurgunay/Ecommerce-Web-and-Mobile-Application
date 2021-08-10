var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var basketSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    
    productList:{   
      totalprice:Number,
      productArray: [
      {
        size: {type: Number , 
          required:true},
        name: {type: String , 
          required:true},
        quantity:
        {type: Number , 
          required:true},//37DEN 3 MÜ 5 Mİ
        price:{
          type: Number , 
          required:true
        },
        image: [String],
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "products",
          required: true,
          // autopopulate: {
          //   maxDepth: 1,
          // },
        },
      },
    ],
  }},
  {
    timestamps: true,
  }
);
//basketSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Basket", basketSchema);
