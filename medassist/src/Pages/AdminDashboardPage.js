import React from "react";
import Dashboard from "../Containers/Admin/AdminDashboard";

export default function AdminDashboard(props) {
  return (
    <div>
      <Dashboard history={props.history} />
    </div>
  );
}
