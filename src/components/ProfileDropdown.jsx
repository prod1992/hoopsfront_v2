import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  ButtonBase,
  Menu,
  MenuList,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem
} from "@material-ui/core";

import {
  KeyboardArrowDown as ArrowDownIcon,
  AccountCircle as AccountIcon,
  Https as HttpsIcon,
  PowerSettingsNew as LogoutIcon
} from "@material-ui/icons";

const styles = theme => ({
  root: {
    margin: "25px 0 40px 0"
  },
  menuWrapper: {
    padding: 0
  },
  button: {
    textTransform: "none",
    padding: 8,
    fontSize: 16,
    width: "100%"
  },
  greenAvatar: {
    width: 52,
    height: 52,
    backgroundColor: "#52ba57",
    boxShadow: "0 0 0 4px #eaeaea",
    fontWeight: 600
  }
});

class ProfileDropdown extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <ButtonBase
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.button}
        >
          <Grid container spacing={16} alignItems="center">
            <Grid item xs="auto">
              <Avatar className={classes.greenAvatar}>LG</Avatar>
            </Grid>
            <Grid item xs>
              Levon Grigoryan
            </Grid>
            <Grid item xs="auto">
              <ArrowDownIcon />
            </Grid>
          </Grid>
        </ButtonBase>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="My Profile"
            />
          </MenuItem>
          <Divider />

          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <HttpsIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Change Password"
            />
          </MenuItem>
          <Divider />
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Logout"
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

ProfileDropdown.propTypes = {
  fill: PropTypes.array
};

export default withStyles(styles)(ProfileDropdown);
