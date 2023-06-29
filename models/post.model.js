const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      unique: true,
    },
    post_title: {
      type: String,
      required: true,
    },
    post_body: {
      type: String,
      required: false,
    },
    post_image: {
      type: String,
      required: false,
      default: "",
    },
    post_category: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", postSchema);
