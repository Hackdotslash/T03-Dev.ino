import React from "react";
import clsx from "clsx";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateCharges } from "../functions";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  figures: {
    WebkitTextStrokeWidth: "1.5px",
    WebkitTextStrokeColor: "#BBE1FA",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function DashboardView(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const deptData = props.count.departments;
  const [updatedCharges, setUpdatedCharges] = React.useState(props.charges);
  const [open, setOpen] = React.useState(false);

  const changeCharge = () => {
    updateCharges(updatedCharges);
    setOpen(true);
  };

  console.log(props.count);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">
          Charges Updated! It will be reflected shortly
        </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              Departments
            </Typography>
            <Typography
              component="h2"
              variant="h1"
              color="secondary"
              gutterBottom
              className={classes.figures}
            >
              {props.count.deptCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              Doctors
            </Typography>
            <Typography
              component="h2"
              variant="h1"
              color="secondary"
              gutterBottom
              className={classes.figures}
            >
              {props.count.verified}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              Unverified Doctors
            </Typography>
            <Typography
              component="h2"
              variant="h1"
              color="secondary"
              gutterBottom
              className={classes.figures}
            >
              {props.count.nonVerified}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              Patients
            </Typography>
            <Typography
              component="h2"
              variant="h1"
              color="secondary"
              gutterBottom
              className={classes.figures}
            >
              {props.count.patientCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h4"
              color="secondary"
              gutterBottom
            >
              Department-wise Data
            </Typography>

            <Grid container spacing={2}>
              {deptData.map((departments) => (
                <Grid item xs={12} sm={6} md={4}>
                  {/* Cards  section  */}
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={departments.Image}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {departments.Name}
                      </Typography>
                      {/* Doctors */}
                      <TextField
                        variant="outlined"
                        size="small"
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              Doctors |
                            </InputAdornment>
                          ),
                        }}
                        value={departments.Doctors}
                      />
                      <Typography style={{ textAlign: "justify" }}>
                        {departments.Description}
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* ./ Cards */}
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              medassit charges
            </Typography>
            <TextField
              color="secondary"
              label="Enter percentage"
              value={updatedCharges}
              onChange={(e) => setUpdatedCharges(e.target.value)}
            ></TextField>
            <Button
              onClick={() => {
                changeCharge();
              }}
              variant="contained"
              color={"primary"}
              size="small"
            >
              Set Charges
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
