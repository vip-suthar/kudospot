const mongoose = require("mongoose");

const kudoSchema = new mongoose.Schema({
  from: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  badge: {
    type: mongoose.Types.ObjectId,
    ref: "Badge",
    required: true,
  },
  reason: { type: String, default: "Sometimes there is no reason!" },
  likes: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Kudo", kudoSchema);
