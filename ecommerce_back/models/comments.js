var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    totalRate:{
       
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    totalcomment:{ default:1,
        type: Number},
  
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "products",
      required: true,
    },
 
    comments: [
      {
        // commentId: {
        //   type:mongoose.SchemaTypes.ObjectId,
        // },
        user: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "users",
        },
        isValid: {
            type: Boolean,
            default: false,
          },
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5,
        },
        text: {
          type: String,
          required: true,
        },
        
      }, { timestamps: true }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
