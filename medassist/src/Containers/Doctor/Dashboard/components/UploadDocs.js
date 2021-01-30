import React from "react";
import {
  Grid,
  Paper,
  Button,
  Modal,
  Backdrop,
  Fade,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";

// ------- custom imports
import { uploadDocuments } from "../functions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "60vh",
  },
  docs: {
    display: "flex",
    width: "100%",

    padding: theme.spacing(2),
    "@media (min-width: 300px)": {
      height: "80vh",
    },

    "@media (min-width: 350px)": {
      height: "70vh",
    },

    "@media (min-width: 768px)": {
      height: "70vh",
    },
    "@media (min-width: 992px)": {
      height: "60vh",
    },
    "@media (min-width: 1200px)": {
      height: "60vh",
    },
  },
  default: {
    display: "flex",
    width: "100%",
    height: "60vh",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    padding: theme.spacing(2),
    "@media (min-width: 300px)": {
      height: "80vh",
    },

    "@media (min-width: 350px)": {
      height: "70vh",
    },

    "@media (min-width: 768px)": {
      height: "70vh",
    },
    "@media (min-width: 992px)": {
      height: "60vh",
    },
    "@media (min-width: 1200px)": {
      height: "60vh",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    "@media (min-width: 300px)": {
      fontSize: "50px",
    },

    "@media (min-width: 350px)": {
      fontSize: "50px",
    },

    "@media (min-width: 768px)": {
      fontSize: "55px",
    },
    "@media (min-width: 992px)": {
      fontSize: "60px",
    },
  },
  imgSelected: {
    height: "65vh",
    "@media (min-width: 300px)": {
      width: "300px",
    },

    "@media (min-width: 350px)": {
      width: "300px",
    },

    "@media (min-width: 768px)": {
      width: "auto",
    },
    "@media (min-width: 992px)": {
      width: "auto",
    },
  },
}));

export default function UploadDocs(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [imageFiles, setImageFiles] = React.useState([]);
  const [currentImage, setCurrentImage] = React.useState("");

  const handleOpen = (url) => {
    console.log(url);
    setCurrentImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleImageChange(e) {
    //------------calling firebase function and setting url here .
    if (imageFiles.length === 0) {
      console.log("Error please select a image ");
      return;
    }
    setLoading(true);

    uploadDocuments(
      imageFiles,
      props.ID,
      props.docData,
      props.setDocData,
      setLoading
    );
    setImageFiles([]);
  }

  return (
    <div>
      {/* <Container maxWidth="md" className={classes.container}> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.docs}>
            <Grid container spacing={2} alignItems="space-around">
              {loading ? (
                <div>Loading document </div>
              ) : (
                <>
                  {props.docData.DocUrls !== undefined ? (
                    <Grid container spacing={1}>
                      {Object.keys(props.docData.DocUrls).length > 3
                        ? Object.keys(props.docData.DocUrls).map(
                            (key, index) => (
                                <Grid item xs={4} sm={3} md={2}>
                                  <IconButton
                                    onClick={() =>
                                      handleOpen(props.docData.DocUrls[key])
                                    }
                                  >
                                    <DescriptionIcon
                                      className={classes.icon}
                                      color="secondary"
                                    />
                                  </IconButton>
                                  <br />
                                  <Typography variant="body1" align="center">
                                    {"Doc-" + (index + 1).toString()}
                                  </Typography>
                                </Grid>
                            )
                          )
                        : Object.keys(props.docData.DocUrls).map((key) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                onClick={() =>
                                  handleOpen(props.docData.DocUrls[key])
                                }
                                style={{
                                  background: "#f0f0f0",
                                  height: "100px",
                                  width: "400px",
                                }}
                              >
                                <img
                                  src={props.docData.DocUrls[key]}
                                  alt="docs"
                                  style={{
                                    height: "90px",
                                    width: "auto",
                                  }}
                                />
                              </Button>
                            </Grid>
                          ))}
                    </Grid>
                  ) : (
                    <Typography>
                      Uploaded documents will be shown here
                    </Typography>
                  )}{" "}
                </>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* ============== Modal Part ================== */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <img
              src={currentImage}
              alt="docs"
              // style={{ height: "65vh", width: "auto" }}
              className={classes.imgSelected}
            />
          </Fade>
        </Modal>

        {/* ================= Upload document  ==================  */}

        <Grid item xs={12} md={6}>
          <Paper className={classes.content}>
            <Typography variant="h6" color="secondary" align="center">
              How consultUS verifies you?
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: "black",
                textAlign: "justify",
                textAlignLast: "center",
              }}
            >
              To get verified, you have to simply upload your documents below.
              We will catch you within 3-4 days. Till you get verified, you will
              not be able to take any appointments. <br />
              You can upload multiple documents here.
            </Typography>
            <Typography style={{ paddingTop: "20px" }}>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setImageFiles(
                    imageFiles.concat(Array.from(event.target.files))
                  );
                  console.log(event.target.files);
                }}
                multiple
              />

              {/* ------------end here ----------- */}
              <Button
                onClick={handleImageChange}
                variant="contained"
                color="primary"
              >
                Upload
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* </Container> */}
    </div>
  );
}
