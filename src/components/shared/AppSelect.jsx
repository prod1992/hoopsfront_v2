import React from "react";
import { connect } from "react-redux";
import getApiCredentials from "../../constants/api";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";

import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  NoSsr,
  TextField,
  Paper,
  Chip,
  MenuItem,
  Button,
  OutlinedInput,
  Dialog
} from "@material-ui/core";

import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import AddIcon from "@material-ui/icons/Add";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

import {
  SetSelectedVendor,
  SetVendorList,
  AddNewVendor
} from "../../actions/select.vendor";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    padding: 8
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  },
  addVendorButton: {
    borderRadius: 0,
    width: "100%",
    textTransform: "capitalize",
    margin: 0,
    display: "flex",
    alignItems: "center",
    height: "100%",
    textAlign: "left"
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <div>
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    </div>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function _Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      <Button
        className={props.selectProps.classes.addVendorButton}
        onClick={() => console.log("test")}
      >
        <AddIcon />
        Add New
      </Button>

      {props.children}
    </Paper>
  );
}
const Menu = connect(mapStateToProps)(_Menu);

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class AppSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      single: null,
      multi: null
    };
    this.getVendorData = this.getVendorData.bind(this);
  }

  async getVendorData() {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + "/api/vendors";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    };
    try {
      const reqInstance = new Request(uri, requestOptions);
      const response = await fetch(reqInstance);
      const data = await response.json();
      this.props.dispatch(SetVendorList(data));
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = name => value => {
    this.props.dispatch(
      SetSelectedVendor({
        [name]: value
      })
    );
  };
  componentDidMount = () => {
    this.getVendorData();
  };
  render() {
    const { classes, theme, selectVendor } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    if (typeof selectVendor.vendorList.data == "undefined") {
      return <div />;
    }
    var value = null;
    if (selectVendor.selected) {
      value = selectVendor.selected.single;
    }
    var vendorList = {};

    var vendorList = selectVendor.vendorList.data.map(vendor => ({
      value: vendor.id,
      label: vendor.vendor_name
    }));

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={vendorList}
            components={components}
            value={value}
            onChange={this.handleChange("single")}
            placeholder="Select vendor"
            isClearable
            input={
              <OutlinedInput
                name="vendor"
                labelWidth={this.state.labelWidth}
                id="outlined-vendor-native-simple"
              />
            }
          />
        </NoSsr>
      </div>
    );
  }
}

AppSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    selectVendor: state.selectVendor
  };
}
export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(AppSelect)
);
