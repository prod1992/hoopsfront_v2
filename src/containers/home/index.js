import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import AppSidenav from "../../components/AppSidenav";
import Catalogue from "../catalogue";
import SingleProduct from "../catalogue/SingleProduct";
import Customers from "../customers";
import ImportPage from "../import";
import Quotes from "../quotes";
import Dashboard from "../dashboard";
import Jobs from "../jobs";
import PurchaseOrders from "../purchase-orders";

const drawerWidth = 245;
const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh"
  },
  mainWrapper: {
    flexGrow: 1,
    padding: "90px 30px 0px 30px",
    marginBottom: 90
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
  }
});

class Home extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    return (
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
              <AppSidenav />
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
              <AppSidenav />
            </Drawer>
          </Hidden>
        </nav>
        <main role="main" className={classes.mainWrapper}>
          <Switch>
            <Redirect exact from="/" to="/catalogue" />

            <Route path="/customers" component={Customers} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/catalogue" component={Catalogue} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/quotes" component={Quotes} />
            <Route path="/purchase-orders" component={PurchaseOrders} />

            <Route path="/import" component={ImportPage} />
            <Route exact path="/product/:id" component={SingleProduct} />
            <Route render={() => <Redirect to="/catalogue" />} />
          </Switch>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Home);
