// ---------------- Doctor's list according to departments ----------------- //
// props required -> department -> fetched from url

import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  ButtonBase,
  Avatar,
  TextareaAutosize,
  Chip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

// ---------------- custom imports 
import DepartmentDoctor from "./functions";
import ListStyles from "./styles";
import CardPreloader from "./components/CardPreloader";


export default function List(props) {
  const classes = ListStyles();
  const [doctorData, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0,0);
    DepartmentDoctor(props.department, setData, setLoading);
  }, [props.department]);

  return (
    <React.Fragment>
      {loading ? (
        <CardPreloader />
      ) : (
        <Container maxWidth="md" className={classes.container}>
          {doctorData.map((doctors) => (
            <Paper
              elevation={0}
              className={classes.paperProfile}
              variant="outlined"
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <Avatar
                      alt={doctors.Doc_name}
                      src={doctors.Doc_url}
                      className={classes.avatar}
                    />
                  </ButtonBase>
                </Grid>

                <Grid item xs={12} md container>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h5">
                      <b>{doctors.Doc_name}</b>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {Object.keys(doctors.Doc_Spec).map((key) => (
                        <>
                          {doctors.Doc_Spec[key] !== "" && (
                            <span> {doctors.Doc_Spec[key]} </span>
                          )}
                        </>
                      ))}
                    </Typography>
                    <Typography>
                      <TextareaAutosize
                        rows={3}
                        rowsMax={3}
                        defaultValue={doctors.Doc_bio}
                        className={classes.bio}
                        readOnly
                      />
                    </Typography>
                    <Typography gutterBottom>
                      <b>Consultation Fees</b>{" "}
                    </Typography>
                    <Chip
                      color="primary"
                      icon={<AttachMoneyIcon color="secondary" />}
                      label={
                        <span className={classes.fees}>{doctors.Doc_fees}</span>
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Grid item>
                      <Link
                        to={{
                          pathname: `/patient/form/${props.department}/${doctors.Doc_id}/${doctors.Doc_name}`,
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          Book Appointment
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Container>
      )}
    </React.Fragment>
  );
}
