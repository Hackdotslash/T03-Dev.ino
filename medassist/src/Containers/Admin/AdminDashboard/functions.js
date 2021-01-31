import firebaseinit from "../../../Components/Firebase/firebaseAuth";
import firebase from "firebase";

// database ref declarations
const doctorDb = firebaseinit.database().ref("Doctors");
const patientDb = firebaseinit.database().ref("Patients");
const deptDb = firebaseinit.database().ref("Departments");
const feedbackDb = firebaseinit.database().ref("Feedbacks");
const adminDb = firebaseinit.database().ref("Admin");

// getting id lists from database
const getDashboardData = (
  setUnverifiedDoctors,
  setVerifiedDoctors,
  setLoading,
  setCount,
  setCharges,
  history
) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && user.email === "teamdevino@gmail.com") {
      // fetching Department Data
      let dept = [];
      deptDb.once("value", (snapshot) => {
        let departments = snapshot.val();
        console.log(departments);
        for (let data in departments) {
          if (departments[data].Doctors !== 0) {
            dept.push(departments[data]);
          }
        }
      });

      adminDb.child("Charges").once("value", (snapshot) => {
        setCharges(snapshot.val());
      });

      // --- fetching list for both verified and unverified doctor
      doctorDb.child("ID_List").on("value", (snapshot) => {
        let id_listV = [];
        let id_listU = [];
        let patientCount = 0;
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val() === 0) {
            id_listU.push(childSnapshot.key);
          } else {
            id_listV.push(childSnapshot.key);
          }
        });

        // fetching number of patient from ID_Table
        patientDb.child("ID_Table").on("value", (snapshot) => {
          patientCount = snapshot.val();
          setCount({
            verified: id_listV.length,
            nonVerified: id_listU.length,
            departments: dept,
            deptCount: dept.length,
            patientCount: Object.keys(patientCount).length,
          });
        });
        getDoctorData(id_listU, setUnverifiedDoctors);
        getDoctorData(id_listV, setVerifiedDoctors);
        setLoading(false);
      });
    } else {
      // redirecting to login form
      history.push("/admin/login");
    }
  });
};

//---------- Getting list of unverified doctors
const getDoctorData = (id_list, setDoctors) => {
  let doctors = {};
  id_list.forEach((id) => {
    doctorDb.child(id).on("value", (snapshot) => {
      doctors[id] = snapshot.val();
    });
    setDoctors(doctors);
  });
  return doctors;
};

// ---- verifying doctor
const verifyDoctor = (id, department) => {
  doctorDb.child(id).update({ Verification_status: 1 });
  doctorDb.child("ID_List").child(id).set(1);
  deptDb.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().Name === department) {
        deptDb
          .child(childSnapshot.key)
          .child("Doctors")
          .set(childSnapshot.val().Doctors + 1);
        console.log("Id updated");
      }
    });
  });
};

// ----- unverifying the doctor
const unVerifyDoctor = (id, department) => {
  doctorDb.child(id).update({ Verification_status: 0 });
  doctorDb.child("ID_List").child(id).set(0);
  deptDb.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().Name === department) {
        deptDb
          .child(childSnapshot.key)
          .child("Doctors")
          .set(childSnapshot.val().Doctors - 1);
        console.log("Id updated");
      }
    });
  });
};

// --- pushing total fees to the doctor db
const addTotalFees = (docId, transfees, totalfees) => {
  doctorDb
    .child(docId)
    .update({ TransactionFees: transfees, TotalFees: totalfees });
};

// ----- fetching feedbacks from doctor
const getFeedbacks = (setFeedbacks, setLoading) => {
  feedbackDb.on("value", (snapshot) => {
    setFeedbacks(snapshot.val());
    setLoading(false);
  });
};

const updateLogs = (data, docId, len, transactionData, transactionID) => {
  doctorDb.child(docId).update({ PatientLog: data });

  // ------ reducing number of payments
  doctorDb.child(docId).update({ PendingPayments: len });

  // ------ updating doctor's transaction logs
  doctorDb.child(docId).update({ TransactionID: transactionID + 1 });
  // --- updaing transaction logs
  doctorDb.child(docId).update({ TransactionLogs: transactionData });
};

const updateCharges = (charge) => {
  adminDb.child("Charges").set(charge, (err) => {
    if (err) {
      console.log(err);
    } else {
      // updating charges for all the doctors
      doctorDb.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (
            childSnapshot.key !== "Doctor_List" &&
            childSnapshot.key !== "ID" &&
            childSnapshot.key !== "ID_List"
          ) {
            // fetching and updating only doctor ids
            console.log(
              childSnapshot.val().TransactionFees,
              childSnapshot.val().feesUSD
            );
            let data = childSnapshot.val();
            let final_fees =
              parseFloat(data.feesUSD) +
              (parseFloat(data.feesUSD) * charge) / 100 +
              parseFloat(data.TransactionFees);
            final_fees = final_fees.toFixed(2);
            doctorDb
              .child(childSnapshot.key)
              .child("TotalFees")
              .set(final_fees, (err) => {
                if (err) {
                  console.log(err);
                }
              });
          }
        });
      });
    }
  });
};

const consultUSCharges = (setcomPercent) => {
  adminDb.child("Charges").once("value", (snapshot) => {
    setcomPercent(snapshot.val());
  });
};

export {
  getDashboardData,
  getDoctorData,
  verifyDoctor,
  unVerifyDoctor,
  getFeedbacks,
  addTotalFees,
  updateLogs,
  updateCharges,
  consultUSCharges,
};
