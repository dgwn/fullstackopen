import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { List } from "grommet";

const User = (users) => {
  const id = useParams().id;
  console.log(users);

  const user = users.users.find((n) => n.id === id);
  if (!user) {
    return null;
  }

  const data = user.blogs.map((blog) => ({ id: blog.id, title: blog.title }));

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added Blogs:</h4>

      <List data={data} pad="small">
        {(blog) => <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>}
      </List>

      {/* <ul>
        {user.blogs.map((blog) => (
          <li>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default User;
