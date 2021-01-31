

import React from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  Icon,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Skeleton from "@material-ui/lab/Skeleton";

import PatientMeetingStyles from "../styles";

export default function CardPreloader() {
  const classes = PatientMeetingStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card className={classes.card} elevation={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                  <Typography
                    align="center"
                    className={classes.heading}
                    variant="h5"
                  >
                    <Icon className={classes.icon}>
                      <AssignmentIcon />
                    </Icon>
                    Appointment details and link
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CardContent className={classes.CardContent}>
                    <Typography gutterBottom variant="h4">
                      <Skeleton
                        variant="rect"
                        animation="wave"
                        component="span"
                      />
                    </Typography>
                    <Typography gutterBottom variant="h4">
                      {" "}
                      <Skeleton
                        variant="rect"
                        animation="wave"
                        component="span"
                      />{" "}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <CardContent className={classes.CardContent}>
                    <Typography gutterBottom variant="h6">
                      <Typography gutterBottom variant="h4">
                        {" "}
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          component="span"
                        />{" "}
                      </Typography>
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      <Typography gutterBottom variant="h4">
                        {" "}
                        <Skeleton
                          variant="rect"
                          animation="wave"
                          component="span"
                        />{" "}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Grid>
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
                  <Button disabled={true} className={classes.disabled_button}>
                    Click to connect
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
