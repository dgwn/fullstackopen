import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  resetNotification
} from ".././reducers/notificationReducer";
import { voteBlog, removeBlog } from ".././reducers/blogReducer";
import Button from "@material-ui/core/Button";

const BlogDetails = (blogs) => {
  const id = useParams().id;
  const blog = blogs.blogs.find((n) => n.id === id);

  const dispatch = useDispatch();
  const history = useHistory();

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

  const deleteBlog = async (blog) => {
    try {
      // await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(setNotification(`"${blog.title}" has been deleted`));
      history.push("/");
    } catch (exception) {
      dispatch(setNotification("Error deleting blog"));
    }
  };

  return (
    <div className="blog">
      <h2>
        &quot;{blog.title}&quot; - {blog.author}
      </h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginLeft: ".5rem" }}
        onClick={() => updateLikes(blog)}
      >
        Like
      </Button>
      &nbsp;
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          if (window.confirm("Do you really want to remove this blog?")) {
            deleteBlog(blog);
          }
        }}
      >
        Delete
      </Button>
      <p>added by {blog.user.name}</p>
    </div>
  );
};

export default BlogDetails;
