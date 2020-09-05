const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Google",
    author: "Larry Page",
    url: "http://www.google.com",
    likes: 5,
    __v: 0
  },
  {
    title: "Facebook",
    author: "Mark Zuck",
    url: "http://www.facebook.com",
    likes: 0,
    __v: 0
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
};
