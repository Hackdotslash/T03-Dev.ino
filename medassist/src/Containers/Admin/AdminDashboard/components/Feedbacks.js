import React from "react";
import {
  Grid,
  Card,
  InputBase,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Paper,
} from "@material-ui/core";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import { getFeedbacks } from "../functions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  default: {
    display: "flex",
    width: "100%",
    height: 440,
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Feedbacks() {
  const classes = useStyles();
  const [feedbacks, setFeedbacks] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getFeedbacks(setFeedbacks, setLoading);
  }, []);

  return (
    <div>
      <Typography component="h1" variant="h4" color="secondary" gutterBottom>
        Feedbacks
      </Typography>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {feedbacks === null ? (
            <Paper className={classes.default}>
              <Typography variant="h4" color="secondary">
                No Feedbacks
              </Typography>
            </Paper>
          ) : (
            <>
              <Grid container spacing={3}>
                {Object.keys(feedbacks).map((id) => (
                  <Grid item xs={12} sm={6}>
                    <Card>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="feedback"
                            style={{ background: "#BBE1FA" }}
                          >
                            <FormatQuoteIcon color="secondary" />
                          </Avatar>
                        }
                        title={feedbacks[id].Patient_Name}
                        subheader={id}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {feedbacks[id].Doctor_Name}
                        </Typography>
                        <InputBase
                          fullWidth
                          multiline="true"
                          rowsMax={4}
                          rows={4}
                          defaultValue={feedbacks[id].Message}
                        />
                        <Divider />
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={6}
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {feedbacks[id].Doctor_ID}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {feedbacks[id].Department}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
}
