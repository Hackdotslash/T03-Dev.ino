//---------------- fetching data for a particular department doctor ------------ //

import firebaseinit from "../../../Components/Firebase/firebaseAuth";

const doctorDb = firebaseinit.database().ref("Doctors");

export default function DepartmentDoctor(department, setData, setLoading) {
  doctorDb.once("value").then((snapshot) => {
    const doctor_arr = [];
    snapshot.forEach((childSnapshot) => {
      const values = childSnapshot.val();
      if (
        values.Department === department &&
        values.Verification_status === 1
      ) {
        const data = {
          Doc_name: values.Name,
          Doc_Spec: values.Specialization,
          Doc_id: childSnapshot.key,
          Doc_url: values.imageURL,
          Doc_bio: values.Bio,
          Doc_fees : values.TotalFees
        };
     
        doctor_arr.push(data);
      }
    });
    setData(doctor_arr);
    setLoading(false);
  });
}
