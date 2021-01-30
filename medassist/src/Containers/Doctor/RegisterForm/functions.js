/* eslint-disable no-unused-vars */
import firebase from "firebase";
import firebaseinit from "../../../Components/Firebase/firebaseAuth";

const doctorDb = firebaseinit.database().ref("Doctors");
const department = firebaseinit.database().ref("Departments");
const storage = firebase.storage().ref();

//  function for fetching and updating doctor id

const updateId = (setDocId) => {
  doctorDb.child("ID").once("value", function (snapshot) {
    console.log(snapshot.val());
    setDocId(snapshot.val());
    doctorDb.child("ID").set(snapshot.val() + 1, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
};

// function for creating appointement slots object based on schedule of doctor

const createSlots = (array) => {
  let Schedule = {};

  array.forEach(function (item, index) {
    let timing = {};
    let Slot = {};
    // ------------- converting start and end time to GMT
    let today = new Date();
    let changed_time = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      item.endTimeHour,
      item.endTimeMinute,
      0
    );
    let updated_end_time = new Date(
      changed_time.toLocaleString("en-US", { timeZone: "GMT" })
    );

    timing["end_time"] =
      updated_end_time.getHours() + ":" + updated_end_time.getMinutes();

    today = new Date();
    changed_time = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      item.startTimeHour,
      item.startTimeMinute,
      0
    );
    let updated_start_time = new Date(
      changed_time.toLocaleString("en-US", { timeZone: "GMT" })
    );

    timing["start_time"] =
      updated_start_time.getHours() + ":" + updated_start_time.getMinutes();

    // calculating the no of slots
    let diffHour =
      (updated_end_time.getHours() - updated_start_time.getHours()) * 60;
    let diffMins =
      updated_end_time.getMinutes() - updated_start_time.getMinutes();
    let slotsNumber = (parseInt(diffHour) + parseInt(diffMins)) / 20;

    // creating and setting -1 against all slots
    let time = new Date();
    time.setHours(
      updated_start_time.getHours(),
      updated_start_time.getMinutes()
    );

    // setting the first slot
    let min;
    if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(time.getMinutes())) {
      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(time.getHours())) {
        min = "0" + time.getHours() + ":0" + time.getMinutes();
        Slot[min] = -1;
      } else {
        min = time.getHours() + ":0" + time.getMinutes();
        Slot[min] = -1;
      }
    } else {
      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(time.getHours())) {
        min = "0" + time.getHours() + ":" + time.getMinutes();
        Slot[min] = -1;
      } else {
        min = time.getHours() + ":" + time.getMinutes();
        Slot[min] = -1;
      }
    }

    // setting the first slot

    // setting the remaining slots
    for (var i = 1; i < slotsNumber; i++) {
      time.setMinutes(time.getMinutes() + 20);
      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(time.getMinutes())) {
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(time.getHours())) {
          min = "0" + time.getHours() + ":0" + time.getMinutes();
          Slot[min] = -1;
        } else {
          min = time.getHours() + ":0" + time.getMinutes();
          Slot[min] = -1;
        }
      } else {
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(time.getHours())) {
          min = "0" + time.getHours() + ":" + time.getMinutes();
          Slot[min] = -1;
        } else {
          min = time.getHours() + ":" + time.getMinutes();
          Slot[min] = -1;
        }
      }
    }

    // pushing Slot object in Schedule object
    timing["Slot"] = Slot;
    Schedule[item.day] = timing;
  });

  return Schedule;
};

// creating the doctorData object

const createDoctorData = (values, specs, docId) => {
  let specialization = {};
  let schedule = createSlots(values.scheduleArray);
  specs.forEach(function (item, index) {
    specialization["Spec-" + index.toString()] = item.spec;
  });
  let today = new Date();
  let dor =
    today.getDate() +
    "/" +
    (parseInt(today.getMonth()) + 1).toString() +
    "/" +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes();

  let doctorData = {
    Name: values.name,
    Email: values.email,
    Bio: values.bio,
    Registration_No: values.reg,
    Department: values.department,
    Verification_status: 0,
    Specialization: specialization,
    Schedule: schedule,
    imageURL: "",
    Gender: values.gender,
    Country: values.country,
    City: values.city,
    ZipCode: values.zipcode,
    DOR: dor,
    feesUSD: values.amountUSD,
    TransactionFees: 0,
    TotalFees: "",
    TransactionID: 0,
    TimeZone: values.timezone,
  };

  return doctorData;
};

// pushing doctor's image to firebase
const uploadToFirebase = (img, path, docId) => {
  // console.log(img.name, path);
  storage
    .child(path)
    .child(img.name)
    .put(img)
    .then(function (snapshot) {
      storage
        .child(path)
        .child(img.name)
        .getDownloadURL()
        .then((url) => {
          doctorDb.child(docId).update({ imageURL: url }, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("image uploaded");
            }
          });
        });
    });
};

// creating auth for new Doctor and  sending Doctor's data to Firebase

const createDoctor = (values, specs, docId, setError) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then((user) => {
      // function to set data of Doctor
      let doctorData = createDoctorData(values, specs, docId);
      doctorDb.child(docId).set(doctorData, function (err) {
        if (err) {
          console.log(err);
        } else {
          uploadToFirebase(values.croppedImg, `Doctors/${docId}`, docId);
        }
      });

      doctorDb
        .child("Doctor_List")
        .child(docId)
        .set(values.name, function (err) {
          if (err) {
            console.log(err);
          }
        });

      doctorDb
        .child("ID_List")
        .child(docId)
        .set(0, function (err) {
          if (err) {
            console.log(err);
          }
        });
    })
    .catch((error) => {
      console.log(error);
      setError("Email Already exists ");
      return;
    });
};

const fetchDepartments = (setDeptList) => {
  let dept_arr = [];
  department.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      dept_arr.push(childSnapshot.val().Name);
    });
  });

  setDeptList(dept_arr);
};

export {
  createDoctor,
  createDoctorData,
  createSlots,
  updateId,
  fetchDepartments,
  uploadToFirebase,
};
