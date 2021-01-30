// -------------- home component ------------- //
import React from "react";

import Container from "@material-ui/core/Container";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

import { Link } from "react-router-dom";

// importing custom component

import CardsStyles from "./styles";
import fetchDepartments from "./functions";
import CardLoaders from "./components/CardLoaders";

export default function Home() {
  const classes = CardsStyles();

  const [deptData, setDeptData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchDepartments(setDeptData, setLoading);
  }, []);

  return (
    <React.Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {loading ? (
            <>
              <CardLoaders />
            </>
          ) : (
            <>
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
                      <Typography style={{ textAlign: "justify" }}>
                        {departments.Description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Link
                        to={{
                          pathname: `/department/doctors/${departments.Name}`,
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          See Doctors
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                  {/* ./ Cards */}
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
