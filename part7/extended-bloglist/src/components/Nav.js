import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link to="/">Blogs</Link>
      &nbsp;
      <Link to="/users">Users</Link>
    </div>
  );
};

export default Nav;
