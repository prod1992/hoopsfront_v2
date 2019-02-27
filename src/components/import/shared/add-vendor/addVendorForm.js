import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { AddNewVendor } from "../../../../actions/select.vendor";
import Clear from "@material-ui/icons/Clear";
import { Paper, Button, Grid, TextField } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  fields: {
    padding: "55px"
  },
  fieldsPaper: {
    padding: "30px"
  },
  button: {
    marginLeft: "15px"
  },
  textField: {
    width: "100%"
  },
  addVendorButtonsBlock: {
    marginTop: "25px",
    marginBottom: "25px"
  }
});
class AddVendorForm extends Component {
  constructor(props) {
    super(props);
    this.closeAddVendor = this.closeAddVendor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addVendor = this.addVendor.bind(this);
    this.state = {
      vendor_name: ""
    };
  }
  addVendor() {
    this.props.addVendorFunction(this.state);
  }
  closeAddVendor() {
    this.props.dispatch(AddNewVendor(false));
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
    const { addVendorFunction, classes } = this.props;
    return (
      <form>
        <div className={classes.fields}>
          <Grid container className={classes.addVendorButtonsBlock}>
            <Grid row={true} container xs={6}>
              <span className="add-v-head">Add vendor</span>
            </Grid>
            <Grid
              row={true}
              container
              xs={6}
              style={{ justifyContent: "flex-end" }}
            >
              <Button onClick={this.closeAddVendor} className={classes.button}>
                <Clear />
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={this.addVendor}
                className={classes.button}
              >
                Save
              </Button>
            </Grid>
          </Grid>

          <Paper className={classes.fieldsPaper}>
            <Grid container>
              <Grid container row={true} spacing={16}>
                <Grid row xs={6}>
                  <TextField
                    className={classes.textField}
                    id="vendor_name"
                    name="vendor_name"
                    label="Vendor name"
                    required="required"
                    value={this.state.age}
                    onChange={this.handleChange("vendor_name")}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid row xs={6}>
                  <TextField
                    className={classes.textField}
                    id="contact_address"
                    name="contact_address"
                    label="Address"
                    value={this.state.contact_address}
                    onChange={this.handleChange("contact_address")}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container row={true}>
                <Grid row xs={6}>
                  <TextField
                    className={classes.textField}
                    id="contact_name"
                    name="contact_name"
                    label="contact name"
                    value={this.state.contact_name}
                    onChange={this.handleChange("contact_name")}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid row xs={6}>
                  <TextField
                    className={classes.textField}
                    id="city"
                    name="city"
                    label="City"
                    value={this.state.city}
                    onChange={this.handleChange("city")}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container row={true}>
                <Grid row xs={6}>
                  <TextField
                    className={classes.textField}
                    id="contact_email"
                    name="email"
                    required="required"
                    label="Contact email"
                    value={this.state.contact_email}
                    onChange={this.handleChange("email")}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid row xs={6}>
                  <TextField
                    className={classes.textField}
                    id="state"
                    name="state"
                    label="State"
                    value={this.state.state}
                    onChange={this.handleChange("state")}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container row={true}>
                <Grid row xs={6}>
                  <TextField
                    className={classes.textField}
                    id="contact_number"
                    name="contact_number"
                    label="Contact number"
                    value={this.state.contact_number}
                    onChange={this.handleChange("contact_number")}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid row xs={6}>
                  <TextField
                    className={classes.textField}
                    id="zip_code"
                    name="zip_code"
                    label="Zip code"
                    value={this.state.zip_code}
                    onChange={this.handleChange("zip_code")}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Grid
            container
            row={true}
            className={classes.addVendorButtonsBlock}
            style={{ justifyContent: "flex-end" }}
          >
            <Button onClick={this.closeAddVendor} className={classes.button}>
              <Clear />
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={this.addVendor}
              className={classes.button}
            >
              Save
            </Button>
          </Grid>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(
    reduxForm({ form: "addVendorForm" })(AddVendorForm)
  )
);
