var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var adressSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },

    adress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//basketSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Adress", adressSchema);
