import { NAVIGATION_ITEMS } from "../constants/navigation";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";
import {
  Grid,
  List,
  Tooltip,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";

const styles = theme => ({
  darkTooltip: {
    backgroundColor: "#222222",
    fontSize: "1em",
    padding: "12px"
  },
  navLink: {
    textDecoration: "none",
    display: "flex",
    width: "100%",
    padding: "18px 26px",
    position: "relative",
    "&:before": {
      content: "''",
      position: "absolute",
      height: "100%",
      width: 0,
      backgroundColor: "#1db3e7",
      top: 0,
      left: 0,
      bottom: 0,
      transition: "0.2s width ease"
    },
    "&.active": {
      backgroundColor: "#e8e8e8",
      fontWeight: 500,
      "&:before": {
        width: 3
      }
    }
  },
  listItemIcon: {
    marginRight: 6
  },
  hoopsLogo: {
    display: "block",
    width: "100%",
    padding: "16px 20px 10px 26px"
  }
});

class AppSidenav extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <a className={classes.hoopsLogo}>
              <Logo
                fill={["#1fb3e6", "#1fb3e6", "#939598", "#939598", "#939598"]}
              />
            </a>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <div style={{ padding: "0 1rem" }}>
              <ProfileDropdown />
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <List className={classes.navList}>
              {NAVIGATION_ITEMS.map((item, index) => (
                <ListItem button key={index} style={{ padding: 0 }}>
                  <Tooltip
                    title={item.title}
                    placement={"right"}
                    classes={{
                      tooltip: classes.darkTooltip
                    }}
                  >
                    <NavLink to={"/" + item.href} className={classes.navLink}>
                      <ListItemIcon className={classes.listItemIcon}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          style: { fontFamily: "inherit" }
                        }}
                        primary={item.title}
                      />
                    </NavLink>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AppSidenav);
