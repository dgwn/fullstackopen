import blogService from "../services/blogs";

const getId = () => (100000 * Math.random()).toFixed(0);

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "CREATE_BLOG":
      const newContent = { ...action.data.data.blog, id: getId() };
      return [...state, newContent];
    case "VOTE":
      const id = action.data.data.blog.id;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
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
