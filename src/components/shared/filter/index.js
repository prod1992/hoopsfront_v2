import React from "react";
import { filterShowHide } from "../../../actions/catalogue-actions";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FilterList from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import { setProducts } from "../../../actions/catalogue-actions";
import getApiCredentials from "../../../constants/api";

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
    boxShadow: "0 0 0 1px #ccc",
    padding: ".35rem 1rem",
    height: 40,
    minWidth: 260,
    fontSize: 14
  },
  iconButton: {
    padding: 9,
    marginLeft: -50,
    borderRadius: 0,
    width: 50
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
    },
    "& * ": {
      fontSize: "inherit",
      fontWeight: "inherit",
      fontFamily: "inherit"
    }
  }
};

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.performSearch = this.performSearch.bind(this);
  }

  showFilterBar() {
    this.props.dispatch(filterShowHide(true));
  }
  performSearch(event) {
    var searchQuery = event.target.value;
    if (searchQuery != "") {
      let token = localStorage["userToken"];
      let uri = getApiCredentials.host + `/api/products?query=${searchQuery}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      };
      const reqInstance = new Request(uri, requestOptions);

      fetch(reqInstance)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.json();
          }
        })
        .then(data => {
          this.props.dispatch(setProducts(data));
        })
        .catch(err => console.log(err, "error"));
    } else {
      let token = localStorage["userToken"];
      let uri = getApiCredentials.host + `/api/products`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      };
      const reqInstance = new Request(uri, requestOptions);

      fetch(reqInstance)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.json();
          }
        })
        .then(data => {
          this.props.dispatch(setProducts(data));
        })
        .catch(err => console.log(err, "error"));
    }
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
            onChange={event => this.performSearch(event)}
            inputProps={{ style: { lineHeight: 1, padding: 0 } }}
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
