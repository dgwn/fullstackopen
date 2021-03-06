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

// Reducers
import {
  setNotification,
  resetNotification
} from "./reducers/notificationReducer";

// Redux
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const notification = useSelector((state) => state);

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

      dispatch(setNotification("Logged in"));

      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials"));
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    setUsername("");
    setPassword("");
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

      dispatch(setNotification(`"${blogObject.title}" has been added`));

      // setNewTitle("");
      // setNewAuthor("");
      // setNewUrl("http://");
      // setVisible(false);
    } catch (exception) {
      dispatch(setNotification("Error posting blog"));
    }
  };

  const deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id);
      dispatch(setNotification(`"${blog.title}" has been deleted`));
    } catch (exception) {
      dispatch(setNotification("Error deleting blog"));
    }
  };

  const updateLikes = async (blog) => {
    try {
      // note that by putting notifications first, clicks to update likes may not register when rapidly clicking,
      // yet if patch is done first, notifcation timeout will take longer than 5 seconds
      // this most likely would not be an issue if using a faster, production connection to mongodb?

      dispatch(resetNotification());
      await blogService.patch(blog.id, blog.likes + 1);
      dispatch(
        setNotification(
          `"${blog.title}" has been updated to ${blog.likes + 1} likes`
        )
      );
    } catch (exception) {
      dispatch(setNotification("Error updating blog"));
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
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div
            key={blog.id}
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
              <div style={{ display: "flex" }}>
                likes: &nbsp;
                <div className="likesNumber"> {blog.likes}</div>
              </div>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginLeft: ".5rem" }}
                onClick={() => updateLikes(blog)}
              >
                Like
              </Button>
              <br />
              {/* blog.user.name must be expressed after result of a conditional, otherwise  blog details try to render before post request goes through*/}
              {blog.user !== undefined && blog.user.name}
              <br />
              {/*  same as above */}
              {blog.user !== undefined && blog.user.name === user.name && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    if (
                      window.confirm("Do you really want to remove this blog?")
                    ) {
                      deleteBlog(blog);
                    }
                  }}
                >
                  Delete
                </Button>
              )}
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
