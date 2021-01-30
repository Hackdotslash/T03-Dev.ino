import firebase from "firebase";
import firebaseinit from "../../../Components/Firebase/firebaseAuth";

const doctorDb = firebaseinit.database().ref("Doctors");

const LoginDoctor = (loginData, setOpen, setLoginData, isLoading, history) => {
  isLoading(true);
  firebase
    .auth()
    .signInWithEmailAndPassword(loginData.Email, loginData.Password)
    .then((user) => {
      doctorDb
        .once("value")
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const values = childSnapshot.val();
            if (values.Email === loginData.Email) {
              isLoading(false);
              history.push(`/doctor/dashboard/${childSnapshot.key}`);
            }
          });
        })
        .catch((err) => {
          isLoading(false);
          setOpen(true);
          setLoginData({
            Email: "",
            Password: "",
          });
        });
    })
    .catch((error) => {
      isLoading(false);
      setOpen(true);
      setLoginData({
        Email: "",
        Password: "",
      });
    });
};

function passwordReset(email, setLoading, setErr) {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      console.log("password reset mail sent ");
      setLoading(true);
    })
    .catch((err) => {
      console.log(err);
      setLoading(true);
      setErr(true);
    });
}

export { LoginDoctor, passwordReset };
