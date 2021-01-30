import firebase from "firebase";
import firebaseinit from "../../../Components/Firebase/firebaseAuth";

const doctorDb = firebaseinit.database().ref("Doctors");
const storage = firebase.storage().ref();
const patDb = firebaseinit.database().ref("Patients");

function fetchDoctorData(docId, history, setDocData, setLoading) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      doctorDb.child(docId).on("value", (snapshot) => {
        if (user.email === snapshot.val().Email) {
          setDocData(snapshot.val());
          setLoading(false);
        } else {
          history.push("/");
        }
      });
    } else {
      history.push("/doctor/login");
    }
  });
}

function removePatient(docId, slot, day) {
  doctorDb
    .child(docId)
    .child("Schedule")
    .child(day)
    .child("Slot")
    .child(slot)
    .set(-1, function (err) {
      if (err) {
        console.log(err);
      } 
    });
}

function uploadDocuments(imgArr, id, data, setDocData, setLoading) {
  let len;
  if (data.DocUrls === undefined) {
    data.DocUrls = {};
    len = 0;
  } else {
    len = Object.entries(data.DocUrls).length;
  }

  // eslint-disable-next-line array-callback-return
  imgArr.map((img, index) => {
    console.log(img.name, index);
    storage
      .child(`Doctors/${id}`)
      .child(img.name)
      .put(img)
      .then(function (snapshot) {
        storage
          .child(`Doctors/${id}`)
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            data.DocUrls["doc" + (len + index).toString()] = url;
            console.log("inside function ", url);
            uploadToDataBase(id, data.DocUrls);
            setLoading(false);

            setDocData({
              ...data,
              DocUrls: data.DocUrls,
            });
          });
      });
  });

  return;
}

function uploadToDataBase(id, urls) {
  console.log(urls);
  doctorDb
    .child(id)
    .child("DocUrls")
    .set(urls, function (err) {
      if (err) {
        console.log(err);
      }
    });
}

function updateProfileImage(img, path, setLoading, setDocData, docData) {
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
          setDocData({
            ...docData,
            imageURL: url,
          });
          setLoading(false);
        });
    });
}

// converting time zone from GMT to doctor's
function convertToLocal(slot, dtz) {
  let time = slot.split(":");
  let td = new Date();
  let today = new Date(
    Date.UTC(
      td.getFullYear(),
      td.getMonth(),
      td.getDate(),
      parseInt(time[0]),
      parseInt(time[1]),
      0
    )
  );
  today = new Date(today.toLocaleString("en-US", { timeZone: dtz }));
  if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(today.getMinutes()))
    return today.getHours() + ":0" + today.getMinutes();
  else return today.getHours() + ":" + today.getMinutes();
}

// TODO:Change the slot as slot from GMT to local time doctor
function addPatientLog(patId, docId, slot, docData, setDocData) {
  const today = new Date();
  let date =
    today.getDate() +
    "/" +
    (today.getMonth() + 1).toString() +
    "/" +
    today.getFullYear();
  patDb.child(patId).once("value", (snapshot) => {
    const val = snapshot.val();
    const data = {
      Name: val.Name,
      Age: val.Age,
      Issue: val.Issue,
      Phone_no: val.Phone_No,
      Date: date + " " + convertToLocal(slot, docData.TimeZone),
      TransactionId: val.Transaction_ID,
      PaymentStatus: 0,
    };
    // adding patient log
    doctorDb
      .child(docId)
      .child("PatientLog")
      .child(patId)
      .set(data, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("patient data added to log ");
          if (docData.PatientLog === undefined) {
            docData.PatientLog = {};
          }
          docData.PatientLog[patId] = data;
          setDocData({
            ...docData,
            PatientLog: docData.PatientLog,
          });
        }
      });
  });

  // adding pending payment
  doctorDb
    .child(docId)
    .child("PendingPayments")
    .once("value", (snapshot) => {
      let pendingPayments = snapshot.val();
      doctorDb.child(docId).update({ PendingPayments: pendingPayments + 1 });
    });

  // remove patient data from patient db
  // let userRef = patDb.child(patId);
  // userRef.remove();

  // console.log("Patient data removed form database ");
}

function updateDoctorData(data, id) {
  doctorDb.child(id).update(data, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("data updated successfully");
    }
  });
}

// fetching patient's data
function fetchPatDocs(patId, setPatDoc, setPatData) {
  patDb.child(patId).once("value", (snapshot) => {
    let docs = snapshot.val().PatUrls;
    if (docs === undefined) {
      setPatDoc({});
    } else {
      setPatDoc(docs);
    }

    setPatData(snapshot.val());
  });
}

function checkAppDate(patId, setAttended) {
  console.log(patId);
  patDb
    .child(patId)
    .child("Date")
    .once("value", (snapshot) => {
      console.log(snapshot.val());
      let ls = snapshot.val().split("/");
      console.log(ls);
      let today = new Date();
      console.log(today.getMonth());
      if (today.getMonth() + 1 > parseInt(ls[1])) {
        console.log("month expired");
        setAttended(true);
      } else if (today.getMonth() + 1 === parseInt(ls[1])) {
        // check if date is old or not
        if (today.getDate() > parseInt(ls[0])) {
          console.log("date expired");
          setAttended(true);
        }
      }
    });
  return true;
}

export {
  fetchDoctorData,
  removePatient,
  uploadDocuments,
  updateProfileImage,
  addPatientLog,
  updateDoctorData,
  fetchPatDocs,
  checkAppDate,
};
