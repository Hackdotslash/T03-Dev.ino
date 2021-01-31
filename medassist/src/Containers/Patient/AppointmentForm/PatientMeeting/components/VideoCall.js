// ------------------------ video conferencing component patient side -------------------- //
// props passes  as roomName

import React from "react";
import Jitsi from "react-jitsi";
import {
  Container,
  Grid,
  Card,
  Backdrop,
  Fade,
  Button,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import videoCallPreloader from "./videoCallPreloader";
import { makeStyles } from "@material-ui/core/styles";
import Prescription from "./Prescripton";

const VideoCallStyles = makeStyles((theme) => ({
  container: {
    // background: "teal",
    height: "75vh",
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(10),
  },
}));

export default function VideoCall(props) {
  const classes = VideoCallStyles();
  const [presOpen, setPresOpen] = React.useState(false);

  const handleOnload = (JitsiMeetAPI) => {
    setTimeout(() => {
      JitsiMeetAPI.addEventListener("passwordRequired", () => {
        console.log("in password required");
        JitsiMeetAPI.executeCommand("password", "krishnaekta32@");
      });
    }, 10);

    setTimeout(() => {
      JitsiMeetAPI.addEventListener("videoConferenceLeft", () => {
        console.log("video conferencing left ");
        // Adding a alert box or info box here .
        props.setEndMeeting(true);
        props.setCall(false);
      });
    }, 10000);
  };

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card className={classes.card} elevation={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                  <Jitsi
                    containerStyle={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "75vh",
                    }}
                    password={"krishnaekta32@"}
                    domain="meet.jit.si"
                    roomName={props.roomName}
                    displayName={"Conference connect"}
                    loadingComponent={videoCallPreloader}
                    onAPILoad={handleOnload}
                    interfaceConfig={{
                      HIDE_INVITE_MORE_HEADER: true,
                      TOOLBAR_BUTTONS: [
                        "microphone",
                        "camera",
                        "closedcaptions",
                        "fullscreen",
                        "hangup",
                        "chat",
                      ],
                      SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                    }}
                    config={{
                      defaultLanguage: "es",
                      disableDeepLinking: true,
                      prejoinPageEnabled: false,
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setPresOpen(true);
            }}
            style={{ margin: 8 }}
          >
            See Prescription
          </Button>
        </Grid>
      </Container>

      {/* -------------------------- Prescription Dialog -------------------- */}
      <Dialog
        open={presOpen}
        onClose={() => setPresOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogContent>
          <Fade in={presOpen}>
            <Prescription
              Data={props.doctorData}
              patId={props.patId}
              patData={props.patData}
            />
          </Fade>
        </DialogContent>
      </Dialog>
    </>
  );
}
