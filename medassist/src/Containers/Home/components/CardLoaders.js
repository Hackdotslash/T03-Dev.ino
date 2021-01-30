import React from "react";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
 
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

export default function CardLoaders() {
    const card_arr = [1, 2, 3];

  return (
    <>
      {card_arr.map((data) => (
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia>
              <Skeleton
                variant="rect"
                width="100%"
                height={250}
                animation="wave"
              />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <Skeleton variant="rect" width="50%" animation="wave" />
              </Typography>
              <Typography>
                <Skeleton variant="text" height={30} animation="wave" />
              </Typography>
            </CardContent>
            <CardActions>
              <Skeleton
                variant="rect"
                width="50%"
                height={20}
                animation="wave"
              />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}
