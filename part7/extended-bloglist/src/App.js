// Core
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

// Components
import Login from "./components/Login";
import NewUser from "./components/NewUser";
// import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
// import BlogTable from "./components/BlogTable";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User";
import BlogDetails from "./components/BlogDetails";
import Nav from "./components/Nav";

// Services
import blogService from "./services/blogs";
import loginService from "./services/login";

// Grommet
import { Grommet, Box, Button, Grid, ResponsiveContext } from "grommet";
import { deepMerge } from "grommet/utils";

// Material-UI
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";

// Reducers
import {
  setNotification,
  resetNotification
} from "./reducers/notificationReducer";
import { createBlog, initBlogs, voteBlog } from "./reducers/blogReducer";
import { setUser, resetUser } from "./reducers/loginReducer";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { initUsers } from "./reducers/usersReducer";

const ResponsiveGrid = ({ children, areas, ...props }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Grid areas={areas[size]} {...props}>
      {children}
    </Grid>
  );
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newUserVisible, setNewUserVisible] = useState(false);
  // const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  // rerender blog list whenever the URL field changes, i.e. when the field is reset on submit
  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
  }, [notification, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));

      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const theme = deepMerge({
    global: {
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px"
      },
      breakpoints: {
        small: {
          value: 900
        },
        desktop: { value: 1500 }
      }
    }
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification("Logged in"));

      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials"));
    }
  };

  const handleCreateUser = async () => {
    try {
      console.log(name);

      await loginService.newUser({
        username,
        name,
        password
      });

      dispatch(setNotification("New user created"));

      setUsername("");
      setPassword("");
      setName("");
    } catch (exception) {
      dispatch(setNotification("Error"));
    }
  };

  const userHandler = (event) => {
    event.preventDefault();
    setNewUserVisible(true);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(resetUser());
    dispatch(setNotification("Logged out"));

    setUsername("");
    setPassword("");
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();

      dispatch(createBlog(blogObject));

      dispatch(setNotification(`"${blogObject.title}" has been added`));
    } catch (exception) {
      dispatch(setNotification("Error posting blog"));
    }
  };

  // const deleteBlog = async (blog) => {
  //   try {
  //     // await blogService.remove(blog.id);
  //     dispatch(removeBlog(blog.id));
  //     dispatch(setNotification(`"${blog.title}" has been deleted`));
  //   } catch (exception) {
  //     dispatch(setNotification("Error deleting blog"));
  //   }
  // };

  const updateLikes = async (blog) => {
    try {
      // note that by putting notifications first, clicks to update likes may not register when rapidly clicking,
      // yet if patch is done first, notifcation timeout will take longer than 5 seconds
      // this most likely would not be an issue if using a faster, production connection to mongodb?

      dispatch(resetNotification());
      dispatch(voteBlog(blog.id, blog.likes));
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
    <Box align="center">
      <div>Welcome {user.name}</div>
      <div>
        <Button
          primary
          onClick={handleLogout}
          color="status-critical"
          label="Logout"
        />
      </div>
    </Box>
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
            {/* <Blog key={blog.id} blog={blog} /> */}
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            {/* <Togglable buttonLabel="View">
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
              blog.user.name must be expressed after result of a conditional, otherwise  blog details try to render before post request goes through
              {blog.user !== undefined && blog.user.name}
              <br />
              {/*  same as above 
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
            </Togglable> */}
          </div>
        ))}
    </div>
  );

  const blogFormRef = useRef();

  return (
    <Grommet theme={theme}>
      <ResponsiveContext.Consumer>
        {(size) => (
          <ResponsiveGrid
            responsive={true}
            rows={["xsmall", "auto", "auto"]}
            columns={["auto", "auto"]}
            gap="small"
            areas={{
              small: [
                { name: "nav", start: [0, 0], end: [1, 0] },
                { name: "login", start: [0, 1], end: [1, 1] },
                { name: "blogs", start: [0, 2], end: [1, 2] }
              ],
              desktop: [
                { name: "nav", start: [0, 0], end: [1, 0] },
                { name: "login", start: [0, 1], end: [0, 1] },
                { name: "blogs", start: [1, 1], end: [1, 1] }
              ]
            }}
          >
            <Router>
              <Box gridArea="nav">
                <Nav />
                {notification !== null && (
                  <Notification notification={notification} />
                )}
              </Box>
              <Box gridArea="login" align="center">
                <h2>Blogs</h2>

                {user === null && (
                  <>
                    <Login
                      handleLogin={handleLogin}
                      username={username}
                      setUsername={setUsername}
                      password={password}
                      setPassword={setPassword}
                    />
                    {newUserVisible === true && (
                      <NewUser
                        newUserVisible={newUserVisible}
                        setNewUserVisible={setNewUserVisible}
                        handleCreateUser={handleCreateUser}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        setName={setName}
                        name={name}
                      />
                    )}
                    <Button
                      variant="outlined"
                      onClick={userHandler}
                      label="Sign Me Up!"
                    ></Button>
                  </>
                )}
                {user !== null && welcomeUser()}
                {user !== null && (
                  <Togglable buttonLabel="Post Blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                  </Togglable>
                )}
              </Box>
              <Box gridArea="blogs" align="center" alignContent="center">
                {/* <Router> */}
                <Switch>
                  <Route path="/users/:id">
                    <User users={users} />
                  </Route>
                  <Route path="/users">
                    <Users users={users} />
                  </Route>
                  <Route path="/blogs/:id">
                    <BlogDetails blogs={blogs} updateLikes={updateLikes} />
                  </Route>
                  <Route path="/">{blogList()}</Route>
                </Switch>
                {/* </Router> */}

                {/* {user !== null && <BlogTable blogs={blogs} />} */}
              </Box>
            </Router>
          </ResponsiveGrid>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
