import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Hidden,
  Grid,
  Avatar,
  ButtonBase,
  Menu,
  // MenuList,
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
    padding: 0,
    fontSize: 16,
    width: "100%"
  },
  greenAvatar: {
    width: 52,
    height: 52,
    backgroundColor: "#52ba57",
    boxShadow: "0 0 0 4px #eaeaea",
    fontWeight: 600,
    marginRight: 15
  }
});

class ProfileDropdown extends React.Component {
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
          disableRipple
        >
          <Grid container alignItems="center">
            <Grid item xs="auto">
              <Avatar className={classes.greenAvatar}>LG</Avatar>
            </Grid>
            <Hidden mdDown>
              <Grid item xs>
                {this.props.first_name}&nbsp;{this.props.last_name}
              </Grid>
            </Hidden>
            <Hidden mdDown>
              <Grid item xs="auto">
                <ArrowDownIcon style={{ lineHeight: 1 }} />
              </Grid>
            </Hidden>
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

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  return {
    first_name: state.authReducer.userData.first_name,
    last_name: state.authReducer.userData.last_name
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(ProfileDropdown)
);
