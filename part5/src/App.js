// Core
import React, { useState, useEffect } from "react";
import "./App.css";

// Components
import Login from "./components/Login";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogTable from "./components/BlogTable";

// Services
import blogService from "./services/blogs";
import loginService from "./services/login";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

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
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Logout
        </Button>
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
    <Grid container>
      <Grid item xs={4} style={{ textAlign: "center", padding: 20 }}>
        <h2>Blogs</h2>
        {notification !== null && <Notification notification={notification} />}

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
        {user !== null && (
          <BlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newAuthor={newAuthor}
            setNewAuthor={setNewAuthor}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
          />
        )}
      </Grid>
      <Grid item xs={8}>
        {user !== null && <BlogTable blogs={blogs} />}
      </Grid>
    </Grid>
  );
};

export default App;
