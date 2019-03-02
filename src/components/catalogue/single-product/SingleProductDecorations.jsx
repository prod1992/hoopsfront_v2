import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Book from "@material-ui/icons/Book";
import Fab from "@material-ui/core/Fab";
import Edit from "@material-ui/icons/Edit";
import RenderDialog from "../../shared/RenderDialog";
import EditDecorationModal from "./EditDecorationModal";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  DecorationHeader: {
    display: "flex",
    alignItems: "center"
  },
  decoration: {
    padding: "5px 5px 5px 15px",
    display: "flex",
    alignItems: "center"
  },
  DecorationHeaderProduct: {
    fontSize: "1.125rem",
    fontWeight: 400
  },
  catalogueProcessHref: {
    textDecoration: "none",
    fontSize: "16px",
    color: "#1DB3E7",
    marginLeft: "15px"
  },
  automateButton: {
    backgroundColor: "#1DB3E7",
    minWidth: "40px",
    cursor: "pointer",
    marginRight: 15
  },
  EditButton: {
    cursor: "pointer"
  }
});

class SingleProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.openDecorationEditModal = this.openDecorationEditModal.bind(this);
    this.closeDecorationEditModal = this.closeDecorationEditModal.bind(this);
    this.setNewDecoration = this.setNewDecoration.bind(this);
    this.state = {
      modalIsOpen: false
    };
  }
  openDecorationEditModal(decoration) {
    this.setState({
      modalIsOpen: true,
      decoration: decoration,
      showPrices: true,
      editPricesMode: false
    });
  }
  closeDecorationEditModal() {
    this.setState({
      modalIsOpen: false,
      decoration: null
    });
  }
  setNewDecoration(data) {
    this.setState({
      decoration: data
    });
  }
  render() {
    const { classes, product } = this.props;

    return (
      <div>
        <RenderDialog
          oppen={this.state.modalIsOpen}
          closeModal={this.closeDecorationEditModal}
          ModalTitle={"Edit Decoration"}
          context={
            <EditDecorationModal
              setNewProduct={this.setNewDecoration}
              closeModal={this.closeDecorationEditModal}
              decorationData={this.state.decoration}
            />
          }
        />
        <div className={classes.DecorationHeader}>
          <h4 className={classes.DecorationHeaderProduct}>
            Decorations Linked to Product({product.decorations.length})
          </h4>
          <a
            href="http://help.hoopscrm.com/decorations/decoration-linked-to-product---vs-your-decorations"
            className={classes.catalogueProcessHref}
          >
            <Fab
              size="small"
              color="primary"
              className={classes.automateButton}
            >
              <Book />
            </Fab>
            <span>Automate your processes by adding catalogues</span>
          </a>
        </div>
        {product.decorations &&
          product.decorations.map((decoration, i) => (
            <Paper key={decoration.name} className={classes.decoration}>
              <p>{decoration.name}</p>
              <Edit
                onClick={() => this.openDecorationEditModal(decoration)}
                className={classes.EditButton}
              />
              {this.state.showPrices && (
                <div>
                  <p>
                    Note:<span>{decoration.notes}</span>
                  </p>
                  <p>
                    Setup cost:<span>{decoration.setup_cost}</span>
                  </p>
                </div>
              )}
            </Paper>
          ))}
      </div>
    );
  }
}

SingleProductDescription.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleProductDescription);
