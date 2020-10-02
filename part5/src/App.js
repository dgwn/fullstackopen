import React, { useState, useEffect } from "react";

import Login from "./components/Login";
import Blog from "./components/Blog";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("http://");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // rerender blog list whenever the URL field changes, i.e. when the gield is reset on submit
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [newUrl]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
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

      blogService.setToken(user.token);
      setUser(user);
      setNotification("Logged In");
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification("Wrong credentials");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
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

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      };
      const newBlog = await blogService.create(blogObject);
      setBlogs([...blogs, newBlog]);
      setNotification(`"${newTitle}" has been added`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setNewTitle("");
      setNewAuthor("");
      setNewUrl("http://");
    } catch (exception) {
      setNotification("Error posting blog");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const welcomeUser = () => (
    <div>
      Welcome {user.name}
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
      <br />
    </div>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>

      <div>
        Author:
        <input
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>

      <div>
        URL:
        <input
          type="url"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>

      <button type="submit">Submit</button>
      <br />
      <br />
    </form>
  );

  const blogList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const notificationAlert = () => {
    const notificationStyle = {
      color: "black",
      backgroundColor: "grey",
      margin: "auto",
      width: "50%",
      textAlign: "center",
      fontSize: "26px"
    };

    return (
      <div>
        <h2 style={notificationStyle}>{notification}</h2>
      </div>
    );
  };

  return (
    <div>
      <h2>Blogs</h2>
      {notificationAlert()}

      {user === null && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user !== null && welcomeUser()}
      {user !== null && blogForm()}
      {user !== null && blogList()}
    </div>
  );
};

export default App;
