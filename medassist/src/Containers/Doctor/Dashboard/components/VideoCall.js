// ------------------------ video conferencing component doctor's side -------------------- //
// props passes  as roomName

import React from "react";
import Jitsi from "react-jitsi";
import {
  Container,
  Grid,
  Card,
  Button,
  Backdrop,
  Fade,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import videoCallPreloader from "./VideoCallPreloader";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { removePatient, addPatientLog, fetchPatDocs } from "../functions";
import Prescription from "./Prescription";

export default function VideoCall(props) {
  const [Docs, setDocs] = React.useState({});
  const [patData, setPatData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [presOpen, setPresOpen] = React.useState(false);
  const [len, setLen] = React.useState(0);

  // ------------------- fetching patient documents
  React.useEffect(() => {
    fetchPatDocs(props.patId, setDocs, setPatData);
  }, [props.patId]);

  const handleOnload = (JitsiMeetAPI) => {
    console.log("in on load handling ", JitsiMeetAPI);

    setTimeout(() => {
      // ---- password required
      JitsiMeetAPI.addEventListener("passwordRequired", () => {
        JitsiMeetAPI.executeCommand("password", "krishnaekta32@");
      });
    }, 10);

    setTimeout(() => {
      // ------ video conference left after 10 sec
      JitsiMeetAPI.addEventListener("videoConferenceLeft", () => {
        props.setOnCall(false);
        props.setView(0);
        removePatient(props.docId, props.slot, props.day);
        addPatientLog(
          props.patId,
          props.docId,
          props.slot,
          props.docData,
          props.setDocData
        );
      });
    }, 10000);
  };

  function handleClick() {
    if (len === Object.entries(Docs).length - 1) {
      return;
    } else {
      setLen(len + 1);
    }
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card elevation={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                  <Jitsi
                    containerStyle={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                    domain="meet.jit.si"
                    roomName={props.roomName}
                    displayName={"Conference connect"}
                    password={"krishnaekta32@"}
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
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={true && Object.entries(Docs).length === 0}
                onClick={() => {
                  setOpen(true);
                }}
                style={{ margin: 8 }}
              >
                See Documents
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setPresOpen(true);
                }}
                style={{ margin: 8 }}
              >
                Add Prescription
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogContent>
          <Fade in={open}>
            <img
              src={Docs["pat" + len.toString()]}
              alt="docs"
              style={{ height: "65vh", width: "auto" }}
            />
          </Fade>
        </DialogContent>
        <DialogActions>
          {len !== 0 && (
            <Button color="secondary" autoFocus onClick={() => setLen(len - 1)}>
              <NavigateBeforeIcon />
            </Button>
          )}
          {len !== Object.entries(Docs).length - 1 && (
            <Button color="secondary" autoFocus onClick={handleClick}>
              <NavigateNextIcon />
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* ---------------------- Prescription Dialog --------------- */}

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
              Name={props.docData.Name}
              patId={props.patId}
              patData={patData}
              setPatData={setPatData}
            />
          </Fade>
        </DialogContent>
      </Dialog>
    </>
  );
}
