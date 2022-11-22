const mongoose = require("mongoose");

const collageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
    },
    logoLink: {
      type: String,
      required: true,
      lowercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collage", collageSchema);
