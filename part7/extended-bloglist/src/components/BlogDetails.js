import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setNotification,
  resetNotification
} from ".././reducers/notificationReducer";
import { voteBlog, removeBlog, commentBlog } from ".././reducers/blogReducer";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";

import { Box, Button, Card, CardHeader, CardBody, CardFooter } from "grommet";
import { Favorite, Trash } from "grommet-icons";

const BlogDetails = (blogs) => {
  const id = useParams().id;
  const blog = blogs.blogs.find((n) => n.id === id);
  const getId = () => (100000 * Math.random()).toFixed(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const [newComment, setNewComment] = useState("");

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

  const postComment = async (event) => {
    try {
      event.preventDefault();
      dispatch(resetNotification());
      dispatch(setNotification("comment has been added"));
      dispatch(commentBlog(blog.id, blog.comments, newComment));

      setNewComment("");
    } catch (exception) {
      dispatch(setNotification("Error adding comment"));
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
      {/* <h2>
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
      <h3>Comments:</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={getId()}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={postComment} id="blogForm">
        <div>
          <TextField
            value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
            label="Comment"
            id="commentInput"
          />
        </div>

        <Button
          variant="outlined"
          color="primary"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Submit
        </Button>
        <br />
        <br />
      </form> */}
      <Card height="auto" width="medium" background="light-3" margin="10px">
        <CardHeader pad="medium">
          <h2>
            &quot;{blog.title}&quot; - {blog.author}
          </h2>
        </CardHeader>
        <CardBody pad="medium" gap="none" background="light-1">
          <p>{blog.url}</p>
          <p>added by {blog.user.name}</p>
          <h3>Comments:</h3>
          <ul>
            {blog.comments.map((comment) => (
              <li key={getId()}>{comment}</li>
            ))}
          </ul>
          <form onSubmit={postComment} id="blogForm">
            <Box direction="row" justify="around">
              <div>
                <TextField
                  value={newComment}
                  onChange={({ target }) => setNewComment(target.value)}
                  label="Comment"
                  id="commentInput"
                />
              </div>

              <Button
                primary
                type="submit"
                margin={{ top: "small" }}
                label="Submit"
              />
              <br />
              <br />
            </Box>
          </form>
        </CardBody>
        <CardFooter pad={{ horizontal: "medium" }} background="light-2">
          <Button
            icon={<Favorite color="red" onClick={() => updateLikes(blog)} />}
            hoverIndicator
          />
          <p>{blog.likes} Likes</p>
          <Button
            icon={
              <Trash
                color="plain"
                onClick={() => {
                  if (
                    window.confirm("Do you really want to remove this blog?")
                  ) {
                    deleteBlog(blog);
                  }
                }}
              />
            }
            hoverIndicator
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogDetails;
