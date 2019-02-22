import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import RenderBlueUrl from "./RenderBlueUrl";

const styles = theme => ({
  chipLabel: {
    padding: "1px 8px 0"
  }
});

const RenderLabelGroup = props => {
  const rootStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: 10
  };
  let chipStyles = {
    borderRadius: 2,
    padding: 0,
    height: 20,
    margin: "0 15px",
    color: "#FFFFFF",
    fontSize: ".8125rem",
    textTransform: "capitalize",
    fontFamily: "inherit"
  };
  chipStyles.backgroundColor =
    props.priority === "required" ? "#e3645b" : "#f0ab5d";

  return (
    <div style={rootStyles}>
      <span>{props.text}</span>
      {props.priority ? (
        <Chip
          classes={{ label: props.classes.chipLabel }}
          style={chipStyles}
          label={props.priority}
        />
      ) : (
        ""
      )}
      <RenderBlueUrl
        fontSize={12}
        anchorText={props.anchorText}
        to={props.url}
      />
    </div>
  );
};

export default withStyles(styles)(RenderLabelGroup);
