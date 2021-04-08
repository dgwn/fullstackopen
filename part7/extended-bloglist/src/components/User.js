import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const User = (users) => {
  const id = useParams().id;
  console.log(users);

  const user = users.users.find((n) => n.id === id);
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
