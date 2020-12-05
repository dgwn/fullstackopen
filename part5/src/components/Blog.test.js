import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "A blog by Jim",
    author: "Jim Brown",
    url: "http://www.google.com",
    likes: 5
  };

  const component = render(<Blog blog={blog} />);

  const div = component.container.querySelector("div");
  //console.log(prettyDOM(div));

  expect(component.container).toHaveTextContent('"A blog by Jim" - Jim Brown');
  expect(component.container).not.toHaveTextContent("likes: 5");
});
