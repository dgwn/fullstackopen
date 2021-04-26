import React from "react";
import { Link } from "react-router-dom";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";

import { DataTable, Text, Box, Meter } from "grommet";

const Users = (users) => {
  const data = users.users.map((user) => ({
    name: user.name,
    id: user.id,
    blogs: user.blogs.length
  }));

  return (
    <div>
      {/* <TableContainer component={Paper}>
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
            {users.users.map((user) => (
              <TableRow key={user.name}>
                <TableCell component="th" scope="row">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <DataTable
        columns={[
          {
            property: "name",
            header: <Text>User</Text>,
            primary: true,
            render: (user) => <Link to={`/users/${user.id}`}>{user.name}</Link>
          },
          {
            property: "blogs",
            header: "Number of Blogs"
          }
        ]}
        data={data}
      />
    </div>
  );
};

export default Users;
