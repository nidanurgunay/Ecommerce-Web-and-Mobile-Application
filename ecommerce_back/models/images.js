var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var imageSchema = new Schema(
  {
    Img: {
        data: Buffer,
        type: Buffer,
        contentType: String
      }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
