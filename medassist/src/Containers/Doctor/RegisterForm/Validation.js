// Details form validation function
const detailsSubmit = (values, setValues, activeStep, setActiveStep) => {
  let error = 0;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (values.name === "") {
    values.isError.name = true;
    error++;
  } else {
    values.isError.name = false;
  }

  if (values.email === "") {
    values.isError.email = 1;

    error++;
  } else if (!re.test(String(values.email).toLowerCase())) {
    values.isError.email = 2;

    error++;
  } else {
    values.isError.email = false;
  }
  if (values.password === "") {
    values.isError.password = true;
    error++;
  } else {
    values.isError.password = false;
  }
  if (values.password !== values.cpass) {
    values.isError.cpass = true;
    error++;
  } else {
    values.isError.cpass = false;
  }
  if (values.department === "") {
    values.isError.department = true;
    error++;
  } else {
    values.isError.department = false;
  }
  if (values.gender === "") {
    values.isError.gender = true;
    error++;
  } else {
    values.isError.gender = false;
  }
  if (values.country === "") {
    values.isError.country = true;
    error++;
  } else {
    values.isError.country = false;
  }
  if (values.city === "") {
    values.isError.city = true;
    error++;
  } else {
    values.isError.city = false;
  }
  
  if (values.zipcode === "") {
    values.isError.zipcode = true;
    error++;
  } else {
    values.isError.zipcode = false;
  }

  if (values.timezone === "") {
    values.isError.timezone = true;
    error++;
  } else {
    values.isError.timezone = false;
  }

  if (values.reg === "") {
    values.isError.reg = true;
    error++;
  } else {
    values.isError.reg = false;
  }
  if (values.croppedImg === {}) {
    values.isError.imgURL = true;
    error++;
  } else {
    values.isError.imgURL = false;
  }
  if (values.bio === "") {
    values.isError.bio = true;
    error++;
  } else {
    values.isError.bio = false;
  }

  if(values.amount ===0){
    values.isError.amount = true;
    error++;
  }
  else {
    values.isError.amount = false;
  }

  // checking if any errors
  if (error === 0) {
    console.log("details validated");
    setActiveStep(activeStep + 1);
  } else {
    console.log(values.isError);
    setValues({ ...values, click: 1 });
    return;
  }
};

const scheduleSubmit = (
  checked,
  activeStep,
  setActiveStep,
  setScheduleError
) => {
  if (checked) {
    console.log("details validated");
    setActiveStep(activeStep + 1);
  } else {
    setScheduleError("Please Select the checkbox to proceed");
    return;
  }
};

export { detailsSubmit, scheduleSubmit };
