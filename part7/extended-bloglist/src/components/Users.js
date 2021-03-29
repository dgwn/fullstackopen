import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Users = (users) => {
  return (
    <div>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "#3f51b5" }}>
            <TableRow>
              <TableCell align="left" style={{ color: "white" }}>
                Name
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Blogs Created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log(users.users)} */}
            {users.users.map((user) => (
              <TableRow key={user.name}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
