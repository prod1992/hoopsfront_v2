import React from "react";

import getApiCredentials from "./../../../constants/api";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import ChipWithRemove from "../../shared/ChipWithRemove";
import {
  Select,
  Grid,
  MenuItem,
  Button,
  FormControl,
  InputLabel
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
const styles = theme => ({
  textField: {
    width: "100%"
  },

  buttonsBlock: {
    justifyContent: "flex-end"
  },
  buttons: {
    marginLeft: "25px"
  },
  inputWrapper: {
    marginTop: "15px",
    width: "100%"
  }
});

class EditDecorationModal extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.updateDecoration = this.updateDecoration.bind(this);
  }

  componentDidMount() {
    const { id, name, notes, setup_cost, ...other } = this.props.decorationData;

    this.setState({
      decorationData: {
        ...other,
        id,
        name,
        notes,
        setup_cost
      }
    });
    console.log(this.state);
  }

  updateDecoration() {
    console.log(this.state.decorationData);
    let token = localStorage["userToken"];
    let uri =
      getApiCredentials.host +
      `/api/decorations/${this.state.decorationData.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(this.state.decorationData)
    };
    const reqInstance = new Request(uri, requestOptions);
    fetch(reqInstance)
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          this.props.setNewProduct(data);
          this.props.closeModal();
        }
      })
      .catch(err => console.log("error ", err));
  }

  getEditedInfo(name, value) {
    this.setState({
      decorationData: {
        ...this.state.decorationData,
        [name]: value
      }
    });
    console.log(this.state);
  }

  render() {
    const { tagInputValue, decorationData } = this.state;
    if (typeof decorationData == "undefined") return <div />;
    // const { productData } = this.props;
    console.log(decorationData);
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid container row>
          <div className={classes.inputWrapper}>
            <TextField
              label="Decoration Name"
              name="name"
              value={decorationData.name}
              className={classes.textField}
              onChange={e => this.getEditedInfo("name", e.target.value)}
              margin="none"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </Grid>
        <Grid container row>
          <div className={classes.inputWrapper}>
            <TextField
              label="Decoration Name"
              name="notes"
              value={decorationData.notes}
              className={classes.textField}
              onChange={e => this.getEditedInfo("notes", e.target.value)}
              margin="none"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </Grid>
        <Grid container row>
          <div className={classes.inputWrapper}>
            <TextField
              label="Setup Cost"
              name="setup_cost"
              value={decorationData.setup_cost}
              className={classes.textField}
              onChange={e => this.getEditedInfo("setup_cost", e.target.value)}
              margin="none"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </Grid>

        <Grid container row className={classes.buttonsBlock} spacing={16}>
          <Button
            className={classes.buttons}
            onClick={() => this.props.closeModal()}
          >
            <Close /> Cancel
          </Button>
          <Button
            className={classes.buttons}
            onClick={this.updateDecoration}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(EditDecorationModal);
