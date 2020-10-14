import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? "none" : "" };
  const showWhenVisible = { display: props.visible ? "" : "none" };

  const toggleVisibility = () => {
    props.setVisible(!props.visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          onClick={toggleVisibility}
          color="default"
          type="submit"
          style={{ marginTop: 10 }}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          onClick={toggleVisibility}
          color="default"
          style={{ marginTop: 10 }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
