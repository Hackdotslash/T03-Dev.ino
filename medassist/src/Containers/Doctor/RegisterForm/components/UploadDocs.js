import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Button,
} from "@material-ui/core";
import FileCopy from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/core/styles";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

// Styles
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    "@media (min-width: 300px)": {
      height: "250px",
      width: "250px",
    },
    "@media (min-width: 350px)": {
      height: "300px",
      width: "300px",
    },
    "@media (min-width: 540px)": {
      height: "300px",
      width: "300px",
    },

    "@media (min-width: 768px)": {
      height: "400px",
      width: "400px",
    },
    "@media (min-width: 992px)": {
      height: "500px",
      width: "500px",
    },
    "@media (min-width: 1200px)": {
      height: "500px",
      width: "500px",
    },
  },
  imgSelected: {
    width: "auto",
    "@media (min-width: 300px)": {
      height: "220px",
    },

    "@media (min-width: 350px)": {
      height: "270px",
    },
    "@media (min-width: 540px)": {
      height: "270px",
    },

    "@media (min-width: 768px)": {
      height: "370px",
    },
    "@media (min-width: 992px)": {
      height: "470px",
    },
    "@media (min-width: 1200px)": {
      height: "470px",
    },
  },
}));

export default function UploadDocs(props) {
  const classes = useStyles();
  const [imageName, setImageName] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [imgURL, setImgURL] = React.useState();
  const [croppedimgURL, setcroppedImgURL] = React.useState();
  
  const [croppedImg, setCroppedImg] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCrop = (cropper) => {
    const canvas = document.createElement("canvas");
    canvas.width = cropper.detail.width;
    canvas.height = cropper.detail.height;

    var img = new Image();
    img.src = imgURL;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      cropper.detail.x * cropper.detail.scaleX,
      cropper.detail.y * cropper.detail.scaleY,
      cropper.detail.width * cropper.detail.scaleX,
      cropper.detail.height * cropper.detail.scaleY,
      0,
      0,
      cropper.detail.width,
      cropper.detail.height
    );

    canvas.toBlob((blob) => {
      // console.log(blob);
      if (blob !== null) {
        if (blob.size < 1000) {
          setDisabled(true);
        } else {
          blob.name = props.id.toString();
          setcroppedImgURL(URL.createObjectURL(blob))
          setCroppedImg(blob);
          setDisabled(false);
        }
      } else {
        setDisabled(true);
      }
    });
  };

  const handleUpload = () => {
    props.getValue(croppedimgURL, croppedImg);
    handleClose();
  };

  return (
    <>
      <TextField
        id="upload"
        name="upload"
        label="Upload Profile Picture"
        onChange={props.getValue}
        value={imageName}
        color="secondary"
        fullWidth
        autoComplete="Doc Links"
        error={props.value.isError.imgURL}
        helperText={props.value.isError.imgURL && "Select your profile picture"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <input
                accept="image/*"
                style={{
                  display: "none",
                }}
                type="file"
                id="icon-button-file"
                onChange={(e) => {
                  setImageName(e.target.files[0].name);
                  console.log(e.target.files[0]);
                  var url = URL.createObjectURL(e.target.files[0]);
                  setImgURL(url);
                  handleOpen();
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton component="span">
                  <FileCopy />
                </IconButton>
              </label>
            </InputAdornment>
          ),
        }}
      />
      <div>
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
            <div className={classes.paper}>
              <Cropper
                src={imgURL}
                className={classes.imgSelected}
                aspectRatio={4 / 4}
                crop={handleCrop}
              ></Cropper>
              <Button
                onClick={handleUpload}
                variant="contained"
                color="primary"
                disabled={disabled}
                style={{ alignItems: "flex-end", marginTop: "5px" }}
              >
                Upload
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
