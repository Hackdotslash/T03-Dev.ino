import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SendIcon from "@material-ui/icons/Send";
import * as emailjs from "emailjs-com";

// ---- EmailJS credentials 
const SERVICE_ID = "gmail";
const TEMPLATE_ID = "doctor_query_32";
const USER_ID = "user_U2yf1ugVfsOk1aw5giCNu";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: 120,
  },
  buttonGrid: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function QueryForm(props) {
  const classes = useStyles();
  const [query, setQuery] = React.useState("");
  const [snackOpen, setSnackOpen] = React.useState(false);

  const sendQuery = () => {
    const email_data = {
      doctorName: props.docData.Name,
      query: query,
      email: props.docData.Email,
    };
    emailjs.send(SERVICE_ID, TEMPLATE_ID, email_data, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
        setSnackOpen(true);
        setQuery("");
      },
      function (err) {
        console.log(err);
      }
    );
  };

  return (
    <div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Query sent.!</Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="secondary">
            Query Form
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            id="doc_name"
            label="Doctor Name"
            value={props.docData.Name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            id="doc_mail"
            label="Email ID"
            value={props.docData.Email}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            id="doc_id"
            label="consultUS ID"
            value={props.ID}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            id="msg"
            multiline
            rows={6}
            label="Message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} className={classes.buttonGrid}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={sendQuery}
            endIcon={<SendIcon />}
            disabled={query === ""}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
