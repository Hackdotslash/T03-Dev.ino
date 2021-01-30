import React from "react";
import {
  TextField,
  Typography,
  Grid,
  Paper,
  ButtonBase,
  InputAdornment,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// custom imports
import { updateProfileImage, updateDoctorData } from "../functions";
// import axios from "axios";

const profileStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 24,
  },
  avatar: {
    height: "100%",
    width: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  imgSelected: {
    height: "470px",
    width: "auto",
  },

  imgpaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "500px",
    width: "500px",
  },
}));

export default function Update(props) {
  const classes = profileStyles();
  const inputEl = React.useRef(null);
  const [imageName, setImageName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [imgURL, setImgURL] = React.useState();
  const [croppedImg, setCroppedImg] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [newSpecs, setNewSpecs] = React.useState([]);
  const [snackOpen, setSnackOpen] = React.useState(false);

  // =================== features to be added later ===================== //
  // const [currencies, setCurrencies] = React.useState([]);
  // const [feesUSD, setfeesUSD] = React.useState(props.docData.feesUSD);
  // const [fees, setfees] = React.useState(0);
  // const [currType, setCurrType] = React.useState("USD");

  // ======= ---- Axios to fetch country ========----------------
  // React.useEffect(() => {
  //   axios.get("https://api.exchangeratesapi.io/latest").then((response) => {
  //     // Initialized with 'EUR' because the base currency is 'EUR'
  //     // and it is not included in the response
  //     const currencyAr = [];
  //     for (const key in response.data.rates) {
  //       currencyAr.push(key);
  //     }
  //     setCurrencies(currencyAr);
  //   });
  // }, []);

  // const handleChange = (event) => {
  //   const data = event.target.value;

  //   axios
  //     .get(`https://api.openrates.io/latest?base=${currType}&symbols=USD`)
  //     .then((response) => {
  //       const result = data * response.data.rates["USD"];
  //       console.log(result);
  //       props.setDocData({ ...props.docData, feesUSD: result });
  //       setfeesUSD(result);
  //     })
  //     .catch((err) => {
  //       console.log("Opps", err.message);
  //     });
  // };

  // const handleChangeCurr = (event) => {
  //   const data = event.target.value;
  //   console.log(data);
  //   setCurrType(data);

  //   axios
  //     .get(`https://api.openrates.io/latest?base=${data}&symbols=USD`)
  //     .then((response) => {
  //       const result = fees * response.data.rates["USD"];
  //       console.log(result);
  //       props.setDocData({ ...props.docData, feesUSD: result });
  //       setfeesUSD(result);
  //     })
  //     .catch((err) => {
  //       console.log("Opps", err.message);
  //     });
  // };

  const handleAddButton = () => {
    setNewSpecs([...newSpecs, { spec: "" }]);
  };

  const handleRemoveButton = (index) => {
    const values = [...newSpecs];
    values.splice(index, 1);
    setNewSpecs(values);
  };

  const handleChangeSpec = (index, event) => {
    const specValues = [...newSpecs];
    specValues[index][event.target.name] = event.target.value;
    setNewSpecs(specValues);
  };

  function onButtonClick() {
    inputEl.current.click();
  }

  function onChange(e) {
    props.setDocData({
      ...props.docData,
      [e.target.name]: e.target.value,
    });
  }

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
      blob.name = props.id.toString();
      setCroppedImg(blob);
    });
  };

  const handleUpload = () => {
    setLoading(true);
    updateProfileImage(
      croppedImg,
      `Doctors/${props.id}`,
      setLoading,
      props.setDocData,
      props.docData
    );
    handleClose();
  };

  const handleUpdate = () => {
    let len = Object.entries(props.docData.Specialization).length;
    console.log(len);
    newSpecs.forEach(function (item, index) {
      props.docData.Specialization["Spec-" + (index + len).toString()] =
        item.spec;
    });

    props.setDocData({
      ...props.docData,
      Specialization: props.docData.Specialization,
    });

    updateDoctorData(props.docData, props.id);
    setSnackOpen(true);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Profile updated.!</Alert>
      </Snackbar>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Details
        </Typography>

        {/*==========  Basic Details =========*/}

        <Grid container spacing={3}>
          {/*..... Image ..... */}
          <Grid item xs={12} lg={3}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <input
                  accept="image/*"
                  style={{
                    display: "none",
                  }}
                  type="file"
                  id="outlined-button-file"
                  ref={inputEl}
                  onChange={(e) => {
                    setImageName(e.target.files[0].name);
                    console.log(e.target.files[0]);
                    var url = URL.createObjectURL(e.target.files[0]);
                    setImgURL(url);
                    handleOpen();
                  }}
                />
                <label htmlFor="outlined-button-file">
                  {loading ? (
                    <div>
                      Loading new image...
                      <br /> This might take a while
                    </div>
                  ) : (
                    <ButtonBase
                      className={classes.image}
                      name={imageName}
                      onClick={() => onButtonClick()}
                    >
                      <img
                        className={classes.avatar}
                        alt={props.docData.Name}
                        src={props.docData.imageURL}
                      />
                    </ButtonBase>
                  )}
                </label>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Grid container spacing={2} direction="column">
              {/*..... Full Name .....*/}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="Name"
                  label="Full Name"
                  variant="outlined"
                  defaultValue={props.docData.Name}
                  onChange={onChange}
                />
              </Grid>

              {/*..... Bio .....*/}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="bio"
                  name="Bio"
                  label="Bio and Experience"
                  multiline
                  rows={5}
                  variant="outlined"
                  defaultValue={props.docData.Bio}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* ============================== feature updates to be released later ============================================ */}

          {/* City 
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="country"
              name="City"
              label="City"
              variant="outlined"
              defaultValue={props.docData.City}
              onChange={onChange}
            />
          </Grid>*/}

          {/* /* Zipcode */}

          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              id="zip"
              name="ZipCode"
              label="Zipcode"
              variant="outlined"
              defaultValue={props.docData.ZipCode}
              onChange={onChange}
            />
          </Grid> */}

          {/* ------- Country --------- */}
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              id="zip"
              name="Country"
              label="Country"
              variant="outlined"
              defaultValue={props.docData.Country}
              onChange={onChange}
            />
          </Grid> */}

          {/* -------------- Consultation Fees --------------- */}
          {/* Fees in local currency
          <Grid item xs={6}>
            <TextField
              id="fees"
              name="fees"
              label="Enter Consultation Fees"
              value={fees}
              color="primary"
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <select
                      name="from"
                      onChange={handleChangeCurr}
                      value={currType}
                    >
                      {currencies.map((cur) => (
                        <option key={cur}>{cur}</option>
                      ))}
                    </select>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setfees(e.target.value);
              }}
              onBlur={handleChange}
            />
          </Grid> */}

          {/* --------------- Fees in USD ----------- */}

          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              id="zip"
              name="feesUSD"
              label="Current Fees in USD"
              variant="outlined"
              value={feesUSD}
            />
          </Grid> */}
          {/* ============================================================================ */}

          {/*..... Spcialization .....*/}
          {Object.keys(props.docData.Specialization).map((key, index) => (
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="specs"
                label={"Specialization " + (index + 1).toString()}
                variant="outlined"
                value={props.docData.Specialization[key]}
              />
            </Grid>
          ))}
          {newSpecs.map((spec, index) => (
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                name={"spec"}
                label="Specialization"
                value={spec.spec}
                onChange={(event) => handleChangeSpec(index, event)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handleRemoveButton(index);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          ))}

          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={handleAddButton}
            >
              Specialization
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Data
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ============================ modal part ===================== */}

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
            <div className={classes.imgpaper}>
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
                disabled={loading}
                style={{ alignItems: "flex-end", margin: "5px" }}
              >
                {loading ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </React.Fragment>
  );
}
