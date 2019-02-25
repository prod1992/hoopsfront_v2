import { NAVIGATION_ITEMS } from "../constants/navigation";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";
import {
  List,
  Tooltip,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";

const styles = () => ({
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
      content: "",
      position: "absolute",
      height: "100%",
      width: 3,
      backgroundColor: "#1db3e7",
      top: 0,
      left: 0,
      bottom: 0
    },
    "&.active": {
      backgroundColor: "#e8e8e8",
      fontWeight: 500
    }
  },
  listItemIcon: {
    marginRight: 6
  }
});

class AppSidenav extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <a className="hoops-logo">
          <Logo
            fill={["#1fb3e6", "#1fb3e6", "#939598", "#939598", "#939598"]}
          />
        </a>
        <ProfileDropdown />
        <List>
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AppSidenav);
