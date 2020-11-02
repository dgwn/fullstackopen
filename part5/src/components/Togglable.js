import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
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
