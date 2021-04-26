import React, { useState, useImperativeHandle } from "react";
import { Box, Button } from "grommet";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <Box align="center" justify="center">
      <div style={hideWhenVisible}>
        <Button
          secondary
          onClick={toggleVisibility}
          margin={{ top: "small" }}
          label={props.buttonLabel}
        />
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button secondary onClick={toggleVisibility} label="Cancel" />
      </div>
    </Box>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

Togglable.displayName = "Togglable";

export default Togglable;
