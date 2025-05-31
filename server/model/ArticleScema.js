const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "edit_requested"],
      default: "pending",
    },
    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

const Article = mongoose.model("Article ", ArticleSchema);

modul.exports=Post;