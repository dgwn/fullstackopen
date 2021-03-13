import blogService from "../services/blogs";

const getId = () => (100000 * Math.random()).toFixed(0);

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "CREATE_BLOG":
      console.log(action.data.data.blog);
      const newContent = { ...action.data.data.blog, id: getId() };
      console.log(newContent);
      return [...state, newContent];
    default:
      return state;
  }
};

export const initBlogs = (blogs) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch({
      type: "CREATE_BLOG",
      data: newBlog
    });
  };
};

export const voteBlog = (id, votes) => {
  return async (dispatch) => {
    const votedAnecdote = await blogService.patch(id, votes + 1);
    dispatch({
      type: "VOTE",
      data: votedAnecdote
    });
  };
};

export default blogReducer;
