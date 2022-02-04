//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var ColorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Color Must Have A Name"],
  },
  c_date: Date,
});

module.exports = mongoose.model("Colors", ColorSchema);
