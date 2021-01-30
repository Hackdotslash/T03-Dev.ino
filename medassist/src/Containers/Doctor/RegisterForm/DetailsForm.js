import React from "react";
import { Grid, Typography } from "@material-ui/core";

// custom imports
import FullName from "./components/FullName";
import Email from "./components/Email";
import Password from "./components/Password";
import ConfirmPassword from "./components/ConfirmPassword";
import Departments from "./components/Departments";
import RegNo from "./components/RegNo";
import UploadDocs from "./components/UploadDocs";
import Specialization from "./components/Specialization";
import Bio from "./components/Bio";
import Gender from "./components/Gender";
import Country from "./components/Country";
import City from "./components/City";
import ZipCode from "./components/ZipCode";
import ConsultationFees from "./components/ConsultationFees";
import ConvertedFees from "./components/ConvertedFees";
import Timezone from "./components/Timezone";

export default function DetailsForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Details
      </Typography>
      <Grid container spacing={3}>
        {/*..... Full Name .....*/}
        <Grid item xs={12}>
          <FullName
            getValue={props.changeHandler("name")}
            value={props.values}
          />
        </Grid>

        {/*..... Email .....*/}
        <Grid item xs={12}>
          <Email getValue={props.changeHandler("email")} value={props.values} />
        </Grid>

        {/*..... Password .....*/}
        <Grid item xs={12} sm={6}>
          <Password
            getValue={props.changeHandler("password")}
            checkClick={props.cspHandler}
            show={props.mdpHandler}
            value={props.values}
          />
        </Grid>

        {/*..... Confirm Password .....*/}
        <Grid item xs={12} sm={6}>
          <ConfirmPassword
            getValue={props.changeHandler("cpass")}
            checkClick={props.cspHandler}
            show={props.mdpHandler}
            value={props.values}
          />
        </Grid>

        {/*..... Departments .....*/}
        <Grid item xs={12}>
          <Departments
            getValue={props.changeHandler("department")}
            value={props.values}
          />
        </Grid>

        {/*..... Registration Number .....*/}
        <Grid item xs={12} sm={6}>
          <RegNo getValue={props.changeHandler("reg")} value={props.values} />
        </Grid>

        {/*..... Upload Documents .....*/}
        <Grid item xs={12} sm={6}>
          <UploadDocs
            getValue={props.upload}
            id={props.id}
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

        {/*..... Country .....*/}
        <Grid item xs={12} sm={6}>
          <Country
            getValue={props.changeHandler("country")}
            value={props.values}
          />
        </Grid>

        {/*..... City .....*/}
        <Grid item xs={12} sm={6}>
          <City getValue={props.changeHandler("city")} value={props.values} />
        </Grid>

        {/*..... Zip Code .....*/}
        <Grid item xs={12} sm={6}>
          <ZipCode
            getValue={props.changeHandler("zipcode")}
            value={props.values}
          />
        </Grid>

        {/*..... Timezone .....*/}
        <Grid item xs={12}>
          <Timezone
            getValue={props.changeHandler("timezone")}
            value={props.values}
          />
        </Grid>


        {/*..... Consultation Fees .....*/}
        <Grid item xs={12} sm={6}>
          <ConsultationFees
            getAmount={props.changeHandler("amount")}
            getCurrType={props.changeHandler("currType")}
            setValue={props.setValues}
            value={props.values}
          />
        </Grid>

        {/*..... Converted Fees .....*/}
        <Grid item xs={12} sm={6}>
          <ConvertedFees value={props.values} setValue={props.setValues} />
        </Grid>
        {/*..... Spcialization .....*/}
        <Grid item xs={12}>
          <Specialization
            handleSpec={props.handleSpec}
            value={props.values}
            specs={props.specs}
            addSpec={props.add}
            removeSpec={props.removeSpec}
          />
        </Grid>

        {/*..... Bio .....*/}
        <Grid item xs={12}>
          <Bio getValue={props.changeHandler("bio")} value={props.values} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
