import React from "react";
import {
  CssBaseline,
  Container,
  Grid,

  Typography,
} from "@material-ui/core";

// import Skeleton from "@material-ui/lab/Skeleton";

import PatientMeetingStyles from "../styles";

export default function videoCallPreloader() {
  const classes = PatientMeetingStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                style={{
                  margin: "8px",
                  display: "flex",
                  justifyContent: "space-around",
                  paddingBottom: "10px",
                }}
              >
                <Typography variant="h6" style={{ color: "#3282B8" }}>
                  Please allow camera and microphone premission to your browser
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
