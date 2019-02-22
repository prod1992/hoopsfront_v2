import React from "react";
import { Grid } from "@material-ui/core";

class Jobs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 500 }}>
              Jobs
            </h2>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Jobs;
