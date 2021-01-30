import firebase from "firebase";
import firebaseinit from "../../../Components/Firebase/firebaseAuth";

const doctorDb = firebaseinit.database().ref("Doctors");
const patientDb = firebaseinit.database().ref("Patients");
const storage = firebase.storage().ref();

// fetching and updating patient's id
function fetchPatId(setPatId) {
  patientDb.child("ID").once("value", (snapshot) => {
    // console.log(snapshot.val());
    setPatId(snapshot.val());
    // updating id
    patientDb.child("ID").set(snapshot.val() + 1, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("id updated");
      }
    });
  });
}

function fetchDocData(setDocData, docId) {
  doctorDb.child(docId).once("value", function (snapshot) {
    setDocData(snapshot.val());
  });
}

function fetchDays(id, setDays, setLoadingCalendar) {
  let arr = [];
  doctorDb
    .child(id)
    .child("Schedule")
    .once("value", (snapshot) => {
      snapshot.forEach((childsnapshot) => {
        arr.push(parseInt(childsnapshot.key));
      });
      // ------ adding doctor's available dates
      setLoadingCalendar(false);
      setDays(arr);
    });
}

function fetchSlots(docId, day, setSlots, setVisibility, setLoadingSlot) {
  doctorDb
    .child(docId)
    .child("Schedule")
    .child(day)
    .on("value", (snapshot) => {
      // console.log(snapshot.val());
      if (snapshot.val() === null) {
        setVisibility(false);
      } else {
        var slots_obj = {};
        for (let [key, value] of Object.entries(snapshot.val().Slot)) {
          var time = key.split(":");
          var new_date = new Date();
          // time from slot
          var setdate = new Date(
            Date.UTC(
              new_date.getFullYear(),
              new_date.getMonth(),
              new_date.getDate(),
              time[0],
              time[1],
              0
            )
          );

          //--- fetching patient's time zone

          var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // console.log(tz);

          // doctor's time according to patient's time zone
          let patTime = new Date(
            setdate.toLocaleString("en-US", { timeZone: tz })
          );
          
          //   if today and selected day are same  //
          if (day === new_date.getDay()) {
            var diff = (patTime - new_date) / 1000 / 60 / 60;
            // console.log("diff value is",diff);
            //   if difference is more than 1 hr then only show slot (After 2 slots)
            if (diff >= 0.67 && value === -1) {
              if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(patTime.getMinutes()))
                slots_obj[key] =
                  patTime.getHours() + ":0" + patTime.getMinutes();
              else
                slots_obj[key] =
                  patTime.getHours() + ":" + patTime.getMinutes();
            }
          } else {
            if (value === -1) {
              if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(patTime.getMinutes()))
                slots_obj[key] =
                  patTime.getHours() + ":0" + patTime.getMinutes();
              else
                slots_obj[key] =
                  patTime.getHours() + ":" + patTime.getMinutes();
            }
          }
        }
        setSlots(slots_obj);
        setVisibility(true);
        setLoadingSlot(false);
      }
    });
}

function uploadDocuments(imgArr, patId) {
  let len = 0;
  let PatUrls = {};

  // eslint-disable-next-line array-callback-return
  imgArr.map((img, index) => {
    console.log(img.name, index);
    storage
      .child(`Patients/${patId}`)
      .child(img.name)
      .put(img)
      .then(function (snapshot) {
        storage
          .child(`Patients/${patId}`)
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            PatUrls["pat" + (len + index).toString()] = url;
            // console.log("inside function ", url);
            uploadToDataBase(patId, PatUrls);
          });
      });
  });

  return;
}

function uploadToDataBase(id, urls) {
  // console.log(urls);
  patientDb.child(id).update({ PatUrls: urls }, function (err) {
    if (err) {
      // console.log(err);
    }
  });
}

function setDoctorSlot(docSlot, day, patId, docId) {
  doctorDb
    .child(docId)
    .child("Schedule")
    .child(day)
    .child("Slot")
    .child(docSlot)
    .set(patId, (err) => {
      if (err) {
        // console.log(err);
      }
    });
}

function addPatientData(values, patId, transactionId) {
  var data = {
    Age: values.age,
    Date: values.date,
    Department: values.department,
    Docid: values.docId,
    Email: values.email,
    Gender: values.gender,
    Issue: values.issue,
    Name: values.name,
    Phone_No: values.phone,
    Time: values.patSlot,
    Transaction_ID: transactionId,
  };

  setDoctorSlot(values.docSlot, values.day, patId, values.docId);

  patientDb.child(patId).set(data, (err) => {
    if (err) {
      // console.log(err);
    } else {
      // ----- uploading documents --//
      uploadDocuments(values.imageFiles, patId);
      // adding patient data to id table
      patientDb.child("ID_Table").update({ [patId]: 0 });
    }
  });
}

export {
  fetchDays,
  fetchSlots,
  fetchPatId,
  uploadDocuments,
  uploadToDataBase,
  addPatientData,
  fetchDocData,
};
