import firebaseinit from "../../Components/Firebase/firebaseAuth";

const dept = firebaseinit.database().ref("Departments");

function fetchDepartments(setDeptData, setLoading) {
  let dept_arr = [];
  // fetching departments data from firebase
  // data object received as {1:{Name:"",Description:"",Image:""},{}}
  dept.once("value", (snapshot) => {
    let departments = snapshot.val();
    for (let data in departments) {
      if (departments[data].Doctors !== 0) {
        dept_arr.push(departments[data]);
      }
    }
    setDeptData(dept_arr);
    setLoading(false);
  });
}

export default fetchDepartments;
