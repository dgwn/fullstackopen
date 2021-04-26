import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "black",
  ":hover": {
    color: "red"
  },
  alignContent: "center",
  height: "100%"
};

const Nav = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "#e6f2fd",
        marginTop: "0"
      }}
    >
      <Link to="/" style={linkStyle}>
        <h3>Blogs</h3>
      </Link>
      &nbsp;
      <Link to="/users" style={linkStyle}>
        <h3>Users</h3>
      </Link>
    </div>
  );
};

export default Nav;
