import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const patch = async (blogToUpdate, likes) => {
  const newLikes = {
    likes: likes
  };

  const response = await axios.patch(baseUrl + "/" + blogToUpdate, newLikes);
  return response.data;
};

const commentPost = async (blogToUpdate, comments) => {
  const newComments = {
    comments: comments
  };

  const response = await axios.post(
    baseUrl + "/" + blogToUpdate + "/comments",
    newComments
  );
  return response.data;
};

const remove = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(baseUrl + "/" + blogToDelete, config);
  return response.data;
};

const blogService = { getAll, create, patch, commentPost, remove, setToken };

export default blogService;
