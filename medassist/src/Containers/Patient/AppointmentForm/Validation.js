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

  if (values.phone === "") {
    values.isError.phone = true;
    error++;
  } else {
    values.isError.phone = false;
  }

  if (values.gender === "") {
    values.isError.gender = true;
    error++;
  } else {
    values.isError.gender = false;
  }

  if (values.age === "") {
    values.isError.age = true;
    error++;
  } else {
    values.isError.age = false;
  }
  if (values.issue === "") {
    values.isError.issue = true;
    error++;
  } else {
    values.isError.issue = false;
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

const scheduleSubmit = (values, activeStep, setActiveStep, setValues) => {
  if (values.patSlot !== "") {
    console.log("details validated");
    setValues({
      ...values,
      isError: {
        ...values.isError,
        patSlot: false,
      },
    });
    setActiveStep(activeStep + 1);
  } else {
    setValues({
      ...values,
      isError: {
        ...values.isError,
        patSlot: true,
      },
    });
    return;
  }
};

export { detailsSubmit, scheduleSubmit };
