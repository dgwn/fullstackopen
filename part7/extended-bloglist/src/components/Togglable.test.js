import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";

import Togglable from "./Togglable";
import Blog from "./Blog";
import Button from "@material-ui/core/Button";

describe("<Togglable />", () => {
  let component;
  const updateLikes = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "A blog by Jim",
      author: "Jim Brown",
      url: "http://www.google.com",
      likes: 5
    };

    component = render(
      <>
        <Blog blog={blog} />
        <Togglable buttonLabel="View">
          {blog.url}
          <br />
          likes: {blog.likes}
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: ".5rem" }}
            onClick={() => updateLikes()}
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
                if (window.confirm("Do you really want to remove this blog?")) {
                  deleteBlog(blog);
                }
              }}
            >
              Delete
            </Button>
          )}
          <br />
        </Togglable>
      </>
    );
  });

  test("at start the children are not displayed", () => {
    const div = component.container.querySelector(".togglableContent");

    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, likes and url are displayed", () => {
    const button = component.getByText("View");
    const div = component.container.querySelector(".togglableContent");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("likes: 5");
    expect(component.container).toHaveTextContent("http://www.google.com");
    expect(div).toHaveStyle("display: block");
  });

  test("clicking 'like' button calls event handler twice", () => {
    const div = component.container.querySelector(".togglableContent");

    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);

    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(updateLikes.mock.calls).toHaveLength(2);
  });
});
