// Core
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Components
import Login from "./components/Login";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
// import BlogTable from "./components/BlogTable";
import Togglable from "./components/Togglable";

// Services
import blogService from "./services/blogs";
import loginService from "./services/login";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

  // const [visible, setVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // rerender blog list whenever the URL field changes, i.e. when the gield is reset on submit
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [notification]);

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

  const addBlog = async (blogObject) => {
    // event.preventDefault();
    try {
      // const blogObject = {
      //   title: newTitle,
      //   author: newAuthor,
      //   url: newUrl
      // };
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blogObject);
      setBlogs([...blogs, newBlog]);
      setNotification(`"${blogObject.title}" has been added`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      // setNewTitle("");
      // setNewAuthor("");
      // setNewUrl("http://");
      // setVisible(false);
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
        <div
          style={{
            border: "1px solid black",
            marginBottom: ".5rem",
            padding: "1rem",
            width: "20rem"
          }}
        >
          <Blog key={blog.id} blog={blog} />
          <Togglable buttonLabel="View">
            {blog.url}
            <br />
            likes: {blog.likes}
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: ".5rem" }}
            >
              Like
            </Button>
            <br />
            {/* blog.user.name must be expressed after result of a conditional, otherwise  blog details try to render before post request goes through*/}
            {blog.user !== undefined && blog.user.name}
            <br />
          </Togglable>
        </div>
      ))}
    </div>
  );

  const blogFormRef = useRef();

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
          <Togglable buttonLabel="Post Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        )}
      </Grid>
      <Grid item xs={8}>
        {user !== null && blogList()}
        {/* {user !== null && <BlogTable blogs={blogs} />} */}
      </Grid>
    </Grid>
  );
};

export default App;
