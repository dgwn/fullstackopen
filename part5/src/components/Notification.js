import React from "react";

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
      <h2 style={notificationStyle}>{notification}</h2>
    </div>
  );
};

export default notificationAlert;
