import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchDepartments } from "../functions";

export default function Departments(props) {
  const [deptList, setDeptList] = React.useState([]);

  // function to fetch department data and setting in deptList
  React.useEffect(() => {
    fetchDepartments(setDeptList);
  }, []);

  return (
    <>
      <FormControl
        style={{ width: "100%" }}
        error={props.value.isError.department}
      >
        <InputLabel htmlFor="departmentLabel">Department </InputLabel>

        {/* If array is empty , rendering circular progress  */}
        {deptList.length === 0 ? (
          <Select
            labelId="departmentLabel"
            id="department"
            value={props.value.department}
            onChange={props.getValue}
            error={props.value.isError.department}
            helperText={
              props.value.isError.department &&
              "Please select your department.!"
            }
          >
            <MenuItem>
              {" "}
              Loading Departments
              <CircularProgress></CircularProgress>
            </MenuItem>
          </Select>
        ) : (
          // Rendering departments
          <Select
            labelId="departmentLabel"
            id="department"
            value={props.value.department}
            onChange={props.getValue}
          >
            {deptList.map((values) => (
              <MenuItem value={values}>{values}</MenuItem>
            ))}
          </Select>
        )}
        <FormHelperText>
          {props.value.isError.department && "Department cannot be empty.!"}
        </FormHelperText>
      </FormControl>
    </>
  );
}
