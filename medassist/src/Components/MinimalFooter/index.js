import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

// importing styles
import FooterStyles from "./styles";

function Copyright() {
  const classes = FooterStyles();
  return (
    <Typography variant="body2" className={classes.copyright} align="center">
      <Link color="inherit" href="https://teamdevino.com/">
        Terms and Conditions
      </Link>
      <span style={{ marginLeft: 8, marginRight: 8, fontSize: 18 }}> | </span>
      <span className={classes.text}>consultUS</span>
      <span style={{ marginLeft: 8, marginRight: 8, fontSize: 18 }}> | </span>
      {"Copyright © "}
      <Link color="inherit" href="https://teamdevino.com/">
        Dev.ino{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function MinimalFooter(props) {
  const classes = FooterStyles();

  return (
    <div className={classes.root} style={{ minHeight: props.height }}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
