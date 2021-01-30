import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Parallax } from "react-parallax";

import useStyles from "./styles";

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <Parallax
        blur={5}
        bgImage={require("../../Assets/bg.jpeg")}
        bgImageAlt="medassist"
        strength={300}
      >
        <div className={classes.content}>
          <Container className={classes.container}>
            <Typography
              gutterBottom
              variant="h2"
              className={classes.title}
              elevation={3}
            >
              Your Virtual Clinic
            </Typography>
            <Typography paragraph variant="h6" className={classes.paragraph}>
              Medical assistance at your fingertips. Consult with
              doctors all around the world with simple procedures and get
              Quicker prescription because we value your health!
            </Typography>
          </Container>
        </div>
        <div></div>
      </Parallax>
    </div>
  );
}
