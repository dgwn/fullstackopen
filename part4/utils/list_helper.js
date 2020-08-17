const _ = require("lodash");

// 4.3 dummy function
const dummy = () => {
  return 1;
};

// 4.4 totalLikes function
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

// 4.5 favoriteBlog function
const favoriteBlog = (blogs) => {
  const reducer = (mostLikes, blog) => {
    return (mostLikes.likes || 0) > blog.likes ? mostLikes : blog;
  };
  const topBlog = blogs.reduce(reducer, {});
  return _.pick(topBlog, ["title", "author", "likes"]);
};
// 4.6 mostBlogs function

// 4.7 mostLikes function

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
