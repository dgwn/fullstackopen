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
    case "COMMENT":
      return state;
    case "REMOVE_BLOG":
      const idToDelete = action.data;
      return state.filter((blog) => blog.id !== idToDelete);
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
    const votedBlog = await blogService.patch(id, votes + 1);
    dispatch({
      type: "VOTE",
      data: votedBlog
    });
  };
};

export const commentBlog = (id, comments, comment) => {
  return async (dispatch) => {
    const updatedComments = [...comments, comment];
    const commentedBlog = await blogService.commentPost(id, updatedComments);
    dispatch({
      type: "COMMENT",
      data: commentedBlog
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: "REMOVE_BLOG",
      data: id
    });
  };
};

export default blogReducer;
