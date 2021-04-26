import React from "react";
import Alert from "@material-ui/lab/Alert";

const notificationAlert = ({ notification }) => {
  return (
    <div
      style={{
        zIndex: 5,
        position: "absolute",
        top: "20vh",
        margin: "auto"
      }}
    >
      <Alert
        severity="info"
        style={{ padding: "80px", boxShadow: "8px 8px 0px black" }}
      >
        {notification}
      </Alert>
    </div>
  );
};

export default notificationAlert;
