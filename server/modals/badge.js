const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  title: { type: String },
  img_src: { type: String },
});

module.exports = mongoose.model("Badge", badgeSchema);
