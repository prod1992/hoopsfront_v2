import React from "react";
import { Grid } from "@material-ui/core";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 400 }}>
              Profile
            </h2>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Profile;
