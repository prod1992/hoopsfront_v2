import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    color: "#FFFFFF",
    "&$cssFocused": {
      color: "#FFFFFF"
    }
  },
  cssFocused: {
    borderColor: "#FFFFFF"
  },
  cssHovered: {
    color: "#FFFFFFF"
  },
  cssUnderline: {
    borderBottomColor: "#FFFFFF",
    "&:after, &:before": {
      borderBottomColor: "#FFFFFF"
    }
  },
  cssOutlinedInput: {
    borderBottomColor: "#FFFFFF",
    color: "#FFFFFF",
    input: {
      height: 48
    },
    "&:after,&:before": {
      borderBottomColor: "#FFFFFF"
    }
  }
});

class SimpleField extends React.Component {
  render() {
    const { classes } = this.props;
    const renderTextField = ({
      input,
      label,
      meta: { touched, error },
      ...custom
    }) => {
      return (
        <TextField
          fullWidth={true}
          label={label}
          {...input}
          {...custom}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            }
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused
            }
          }}
        />
      );
    };

    const { icon, name, fieldType, label, id } = this.props.data;
    return (
      <Field
        name={name}
        component={renderTextField}
        type={fieldType}
        label={label}
      />
    );
  }
}

SimpleField.propTypes = {
  data: PropTypes.object,
  fieldEmpty: PropTypes.func,
  touchedId: PropTypes.array
};

export default withStyles(styles)(SimpleField);
