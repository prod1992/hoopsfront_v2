import React, { Component } from "react";
import { filterShowHide } from "../../../actions/catalogue-actions";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FilterList from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1,
    border: "1px solid #cccccc",
    padding: ".35rem 1rem"
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  filterButton: {
    display: "flex",
    alignItems: "center",
    textTransform: "none",
    color: "#405373",
    fontWeight: 500,
    fontSize: 16,
    "& svg": {
      marginRight: 10
    }
  }
};

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  showFilterBar() {
    this.props.dispatch(filterShowHide(true));
  }

  render() {
    const { catalogueStates, classes } = this.props;
    return (
      <Grid item container>
        <Button
          size="small"
          className={classes.filterButton}
          onClick={() => this.showFilterBar()}
        >
          <FilterList />
          <span>Filter</span>
        </Button>
        <div className="input-filter">
          <InputBase
            className={classes.input}
            placeholder="Enter Your search here"
          />
          <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </div>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    catalogueStates: state.catalogueReducer
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Filter));
