import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const BlogTable = ({ blogs }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "#3f51b5" }}>
          <TableRow>
            <TableCell align="left" style={{ color: "white" }}>
              Title
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Author
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              URL
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {blog.title}
              </TableCell>
              <TableCell align="right">{blog.author}</TableCell>
              <TableCell align="right">{blog.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogTable;
