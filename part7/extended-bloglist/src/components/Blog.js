import React from "react";
const Blog = ({ blog }) => (
  <div className="blog">
    &quot;{blog.title}&quot; - {blog.author}
  </div>
);

export default Blog;
