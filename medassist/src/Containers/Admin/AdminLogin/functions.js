// The code, idea and structure belongs to Team Dev.ino. No part of the code should be used
// without concern of the team. 
// Team Dev.ino reserves all rights over the code and idea and is bound to take actions in case 
// the code is used without their permission


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
