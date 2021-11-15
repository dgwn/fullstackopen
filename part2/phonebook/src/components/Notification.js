import React from "react";

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }

  // const errorStyle = {
  //   color: "white",
  //   backgroundColor: "red",
  //   margin: "10px",
  //   textAlign: "center",
  //   fontSize: "26px"
  // };
  // const successStyle = {
  //   color: "white",
  //   backgroundColor: "green",
  //   margin: "10px",
  //   textAlign: "center",
  //   fontSize: "26px"
  // };

  if (messageType === "success") {
    return <div className="alert alert-success">{message}</div>;
  } else {
    return <div className="alert alert-danger">{message}</div>;
  }
};

export default Notification;
