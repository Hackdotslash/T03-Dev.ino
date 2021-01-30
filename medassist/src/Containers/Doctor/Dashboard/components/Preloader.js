import React from "react";
import { Avatar, Grid, Paper, Typography, ButtonBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const profileStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // margin: "auto",
    maxWidth: 400,
  },
  image: {
    width: 128,
    height: 128,
  },
  avatar: {
    height: "auto",
    width: "100%",
  },
  details: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

export default function Preloader() {
  const classes = profileStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <Avatar alt="Dr. Krishna Ojha" className={classes.avatar} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography gutterBottom variant="h5"></Typography>
                <Typography variant="body2" gutterBottom></Typography>
                <Typography variant="body2" color="textSecondary">
                  Registeration no : 123456
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  color="error"
                  style={{ cursor: "pointer" }}
                >
                  Not Verified
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
