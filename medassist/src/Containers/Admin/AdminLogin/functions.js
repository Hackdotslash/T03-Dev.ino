import firebase from "firebase";

function loginAdmin(email, password, isLoading, setOpen, history) {
  if (email === "teamdevino@gmail.com") {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // shifting to admin dashboard
      
        history.push("/admin/dashboard");
      })
      .catch((error) => {
        isLoading(false);
        setOpen(true);
      });
  } else {
    isLoading(false);
    setOpen(true);
  }
}

export default loginAdmin;
