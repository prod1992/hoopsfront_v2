import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Catalogue from "../catalogue";
import MainPage from "../MainPage";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Logo from "../../components/Logo";
import { NAVIGATION_ITEMS } from "../../constants/navigation";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex"
  },
  darkTooltip: {
    backgroundColor: "#222222",
    fontSize: "1em",
    padding: "12px"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    boxShadow: "none",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 8,
    paddingLeft: 25
  }
});

class Dashboard extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <a className="hoops-logo">
          <Logo />
        </a>

        <List>
          {NAVIGATION_ITEMS.map((item, index) => (
            <ListItem button key={index}>
              <Tooltip
                title={item.title}
                placement={"right"}
                classes={{
                  tooltip: classes.darkTooltip
                }}
              >
                <Link
                  to={item.href}
                  style={{ textDecoration: "none", display: "flex" }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </Link>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <MuiThemeProvider theme={this.props.theme}>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>

          <main className={classes.content}>
            <Switch className={classes.content}>
              <Redirect exact from="/" to="/catalogue" />
              <Route exact path="/dashboard" component={MainPage} />
              <Route exact path="/catalogue" component={Catalogue} />
              <Route exact path="/profile" component={Catalogue} />
              <Route path="/import" component={Catalogue} />
              <Route exact path="/catalogue/:id" component={Catalogue} />
              <Route render={() => <Redirect to="/catalogue" />} />
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Dashboard);
