import React from "react";
import Login from "../Containers/Admin/AdminLogin";

export default function AdminLogin(props) {
  return (
    <div>
      <Login history={props.history} />
    </div>
  );
}
