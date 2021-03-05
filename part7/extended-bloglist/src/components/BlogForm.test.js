import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { prettyDOM, fireEvent } from "@testing-library/dom";

import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();
  const component = render(<BlogForm createBlog={createBlog} />);

  const form = component.container.querySelector("#blogForm");
  const titleInput = component.container.querySelector("#titleInput");
  const authorInput = component.container.querySelector("#authorInput");
  const urlInput = component.container.querySelector("#urlInput");

  fireEvent.change(titleInput, {
    target: { value: "Test Title" }
  });
  fireEvent.change(authorInput, {
    target: { value: "Test Author" }
  });
  fireEvent.change(urlInput, {
    target: { value: "http://www.url.com" }
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  console.log(createBlog.mock.calls);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Test Title",
    author: "Test Author",
    url: "http://www.url.com"
  });
});
