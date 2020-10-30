import React from "react";
import Alert from "@material-ui/lab/Alert";

const notificationAlert = ({ notification }) => {
  return (
    <div>
      <Alert severity="info">{notification}</Alert>
    </div>
  );
};

export default notificationAlert;
