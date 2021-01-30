import React from "react";
import { Grid, Typography } from "@material-ui/core";

// custom imports
import DoctorName from "./components/DoctorName";
import FullName from "./components/FullName";
import Email from "./components/Email";
import PhoneNo from "./components/PhoneNo";
import Gender from "./components/Gender";
import Age from "./components/Age";
import Department from "./components/Department";
import UploadDocs from "./components/UploadDocs";
import Issue from "./components/Issue";

export default function DetailsForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Patient Details
      </Typography>
      <Grid container spacing={3}>
        {/*..... Doctor's Name .....*/}
        <Grid item xs={12}>
          <DoctorName value={props.values} />
        </Grid>

        {/*..... Full Name .....*/}
        <Grid item xs={12}>
          <FullName
            getValue={props.changeHandler("name")}
            value={props.values}
          />
        </Grid>

        {/*..... Email .....*/}
        <Grid item xs={12} sm={6}>
          <Email getValue={props.changeHandler("email")} value={props.values} />
        </Grid>

        {/*..... Phone Number .....*/}
        <Grid item xs={12} sm={6}>
          <PhoneNo
            getValue={props.handleChangePhone("phone")}
            value={props.values}
          />
        </Grid>

        {/*..... Gender .....*/}
        <Grid item xs={12} sm={6}>
          <Gender
            getValue={props.changeHandler("gender")}
            value={props.values}
          />
        </Grid>

        {/*..... Age .....*/}
        <Grid item xs={12} sm={6}>
          <Age getValue={props.changeHandler("age")} value={props.values} />
        </Grid>

        {/*..... Department .....*/}
        <Grid item xs={12} sm={6}>
          <Department value={props.values} />
        </Grid>

        {/*..... Upload Docs .....*/}
        <Grid item xs={12} sm={6}>
          <UploadDocs
            getValue={props.changeHandler("docs")}
            value={props.values}
            setValue = {props.setValues}
            patId = {props.id}
          />
        </Grid>

        {/*..... Issue .....*/}
        <Grid item xs={12}>
          <Issue getValue={props.changeHandler("issue")} value={props.values} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
