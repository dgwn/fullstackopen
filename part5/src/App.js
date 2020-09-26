import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      // setErrorMessage("Wrong credentials");
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      setUser(null);
      setUsername("");
      setPassword("");
    } catch (exception) {}
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        Password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <br />
      <br />
    </form>
  );

  const welcomeUser = () => (
    <div>
      Welcome {user.name}
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
      <br />
    </div>
  );

  const blogList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <h2>Blogs</h2>

      {user === null && loginForm()}
      {user !== null && welcomeUser()}
      {user !== null && blogList()}
    </div>
  );
};

export default App;
