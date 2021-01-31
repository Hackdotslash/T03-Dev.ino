// ---- functions to fetch patient's data on patient's meeting page

import firebaseinit from "../../../Components/Firebase/firebaseAuth";
import moment from "moment";

const doctorDb = firebaseinit.database().ref("Doctors");
const patDb = firebaseinit.database().ref("Patients");
const feedbackDb = firebaseinit.database().ref("Feedbacks");

function fetchDoctorName(doctorId, setDoctorData) {
  doctorDb.child(doctorId).on("value", (snapshot) => {
    setDoctorData(snapshot.val());
  });
}

function fetchPatientData(patId, setPatData, setLoading, setDisable) {
  patDb.child(patId).on("value", (snapshot) => {
    setPatData(snapshot.val());
    checkDateTime(snapshot.val().Date, snapshot.val().Time, setDisable);
    setLoading(false);
  });
}

function checkDateTime(date, time, setDisable) {
  let date_arr = date.split("/");
  let time_arr = time.split(":");
  console.log(time_arr);

  var today = new Date();

  //initial date for feeding into current moment
  let initial_date =
    today.getFullYear() +
    "-" +
    (parseInt(today.getMonth()) + 1).toString() +
    "-" +
    today.getDate();

  // patient booking date
  let patient_date = date_arr[2] + "-" + date_arr[1] + "-" + date_arr[0];

  if (patient_date === initial_date) {
    // creating patient's moment
    let pat_moment =
      patient_date + " " + parseInt(time_arr[0]) + ":" + parseInt(time_arr[1]);

    // current moment
    let current_moment =
      initial_date + " " + today.getHours() + ":" + today.getMinutes();

    // current momet + 20 min for a particular slot
    today.setHours(parseInt(time_arr[0]), parseInt(time_arr[1]) + 20);
    let inc_moment =
      initial_date + " " + today.getHours() + ":" + today.getMinutes();

    console.log(today.getHours(), today.getMinutes());
    let bool = moment(current_moment.toString(), "hh:mm").isBetween(
      moment(pat_moment.toString(), "hh:mm"),
      moment(inc_moment.toString(), "hh:mm")
    );
    console.log(bool);

    setDisable(!bool);
  }
}

function sendFeedBack(patId, feedback) {
  feedbackDb.child(patId).set(feedback);
}

export { fetchDoctorName, fetchPatientData, sendFeedBack };
