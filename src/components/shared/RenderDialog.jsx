import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from "@material-ui/core";

const styles = theme => ({
  root: {
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  modalTitle: {
    fontSize: 18,
    margin: 0
  },

  modalDescription: {
    fontSize: 14,
    margin: 0
  }
});

class RenderDialog extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          classes={{ root: classes.root }}
          open={this.props.oppen}
          onClose={this.props.closeModal}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            <header className="popup_header_block">
              <Grid container justify="space-between" spacing={16}>
                <Grid item>
                  <h3 className={classes.modalTitle}>
                    {this.props.ModalTitle}
                  </h3>
                  <p className={classes.modalDescription}>
                    {this.props.modalDescription}
                  </p>
                </Grid>
                <Grid item>
                  <IconButton>
                    <Close onClick={this.props.closeModal} />
                  </IconButton>
                </Grid>
              </Grid>
            </header>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.context}</DialogContentText>
          </DialogContent>
          <DialogActions />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(RenderDialog);
