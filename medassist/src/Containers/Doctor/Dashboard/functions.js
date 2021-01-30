import firebase from "firebase";
import firebaseinit from "../../../Components/Firebase/firebaseAuth";

const doctorDb = firebaseinit.database().ref("Doctors");
const storage = firebase.storage().ref();

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

function updateDoctorData(data, id) {
  doctorDb.child(id).update(data, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("data updated successfully");
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

export { fetchDoctorData, updateDoctorData,updateProfileImage };
