import firebase from "firebase";
import firebaseinit from "../../../Components/Firebase/firebaseAuth";

const doctorDb = firebaseinit.database().ref("Doctors");
// const storage = firebase.storage().ref();

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

export { fetchDoctorData };
