import axios from "axios";
const baseUrl = "/api/login";
const userUrl = "/api/users";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const newUser = async (credentials) => {
  const response = await axios.post(userUrl, credentials);
  return response.data;
};
const loginService = { login, newUser };

export default loginService;
