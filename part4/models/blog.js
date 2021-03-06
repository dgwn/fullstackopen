const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array,
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  }
});

module.exports = mongoose.model("Blog", blogSchema);
