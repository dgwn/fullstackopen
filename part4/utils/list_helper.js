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
const mostBlogs = (blogs) => {
  // finds out how many blogs were written by each author
  const mostObject = _.countBy(blogs, "author");

  // use a function to find the auhtor with the most blogs out of this object
  const topAuthor = _.max(
    Object.keys(mostObject),
    (author) => mostObject[author]
  );

  // count how many blogs have that author
  const numberWritten = mostObject[topAuthor];

  // create an object which lists author and number of blogs: { author: "Robert C. Martin", blogs: 3 }
  const finalObj = { author: topAuthor, blogs: numberWritten };
  return finalObj;
};

// 4.7 mostLikes function
const mostLikes = (blogs) => {
  // sort blogs into arrays for each author
  const groups = _.groupBy(blogs, (blog) => blog.author);

  // create array of totalLikes() of each group
  const likeArray = _.map(groups, (name) => {
    return {
      author: name[0].author,
      likes: totalLikes(name)
    };
  });

  //return the object with the most likes
  return favoriteBlog(likeArray);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
