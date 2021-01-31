// The code, idea and structure belongs to Team Dev.ino. No part of the code should be used
// without concern of the team. 
// Team Dev.ino reserves all rights over the code and idea and is bound to take actions in case 
// the code is used without their permission


import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@material-ui/core";

const columns = [
  { id: "name", label: "Patient Name", minWidth: 140 },
  { id: "age", label: "Patient Age", minWidth: 110 },
  { id: "issue", label: "Patient's Issue", minWidth: 140 },
  { id: "date", label: "Consultation Date", minWidth: 140 },
  { id: "phone", label: "Contact No.", minWidth: 140 },
];

function createData(name, age, issue, date, phone) {
  return { name, age, issue, date, phone };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  default: {
    display: "flex",
    width: "100%",
    height: 440,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function PatientLog(props) {
  const classes = useStyles();
  const [log, setLog] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = [];

  React.useEffect(() => {
    if (props.appData !== undefined) {
      // eslint-disable-next-line array-callback-return
      Object.keys(props.appData).map((key) => {
        rows.push(
          createData(
            props.appData[key].Name,
            props.appData[key].Age,
            props.appData[key].Issue,
            props.appData[key].Date,
            props.appData[key].Phone_no
          )
        );
      });
      setLog(rows);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appData]);

  return (
    <>
      <Typography component="h1" variant="h4" color="secondary" gutterBottom>
        Patient Logs
      </Typography>
      {Object.entries(log).length === 0 ? (
        <Paper className={classes.default}>
          <Typography variant="h4" color="secondary">
            No patient's seen yet
          </Typography>
        </Paper>
      ) : (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {log
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={log.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
