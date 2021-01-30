// --------------- Footer section ---------------- //
// no props passed

import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";

// icons
import Icon from "@material-ui/core/Icon";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailIcon from "@material-ui/icons/Mail";
import InstagramIcon from "@material-ui/icons/Instagram";

// importing styles
import FooterStyles from "./styles";

function Copyright() {
  const classes = FooterStyles();
  return (
    <Typography variant="body2" className={classes.copyright} align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Dev.ino
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer(props) {
  const classes = FooterStyles();

  return (
    <div className={classes.root} style={{ minHeight: props.height }}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Typography align="center">
          <Icon className={classes.icon}>
            <TwitterIcon />
          </Icon>
          <Icon className={classes.icon}>
            <FacebookIcon />
          </Icon>
          <Icon className={classes.icon}>
            <MailIcon />
          </Icon>
          <Icon className={classes.icon}>
            <InstagramIcon />
          </Icon>
        </Typography>

        <Typography
          variant="h6"
          align="center"
          component="p"
          className={classes.text}
        >
          medassist
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
}
