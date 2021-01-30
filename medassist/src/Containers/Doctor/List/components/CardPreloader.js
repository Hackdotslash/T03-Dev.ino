import React from "react";

import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Container,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";
// ----- custom imports
import ListStyles from "../styles";

export default function CardPreloaders() {
  const card_arr = [1, 2, 3];
  const classes = ListStyles();

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        {card_arr.map((data) => (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card elevation={2}>
                <Grid container>
                  <Grid item xs={12} md={12} lg={4}>
                    <CardMedia>
                      <Skeleton
                        style={{ marginLeft: "50px", marginTop: "15px" }}
                        variant="circle"
                        width={200}
                        height={200}
                        animation="wave"
                      />
                    </CardMedia>
                  </Grid>
                  <Grid item xs={12} md container>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="h5">
                        <Skeleton
                          variant="h5"
                          width="50%"
                          height={40}
                          animation="wave"
                          style={{
                            margin: "15px",
                          }}
                        />
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <Skeleton
                          variant="text"
                          height={90}
                          animation="wave"
                          style={{
                            margin: "15px",
                          }}
                        />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: "15px",
                        marginBottom: "10px",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        height={50}
                        animation="wave"
                        width={180}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
}
