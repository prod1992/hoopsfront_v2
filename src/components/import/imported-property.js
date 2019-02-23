import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});
class PropertyItem extends React.Component {
  render() {
    const { name, options, onChange, required, value } = this.props;

    return (
      <Select
        className="hoops_map_select"
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      >
        <MenuItem>Select</MenuItem>

        {Object.keys(options).map((option, i) => {
          return (
            <MenuItem key={i} value={option}>
              {" "}
              {options[option]}
            </MenuItem>
          );
        })}
      </Select>
    );
  }
}

export default withStyles(styles)(PropertyItem);
