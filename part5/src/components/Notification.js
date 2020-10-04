import React from "react";
import Alert from "@material-ui/lab/Alert";

const notificationAlert = ({ notification }) => {
  const notificationStyle = {
    color: "black",
    backgroundColor: "grey",
    margin: "auto",
    width: "50%",
    textAlign: "center",
    fontSize: "26px"
  };

  return (
    <div>
      <Alert severity="info">{notification}</Alert>
    </div>
  );
};

export default notificationAlert;
