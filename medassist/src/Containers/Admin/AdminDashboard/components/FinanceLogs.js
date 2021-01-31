import React from "react";
import {
  Button,
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

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  default: {
    display: "flex",
    width: "100%",
    height: 440,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    maxHeight: 440,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const columns = [
  { id: "id", label: "DocId", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "dept", label: "Department", minWidth: 170 },
  { id: "dor", label: "Reg.Date", minWidth: 170 },
  { id: "gender", label: "Gender", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 170 },
];

function createData(id, name, dept, dor, gender, action) {
  return { id, name, dept, dor, gender, action };
}

export default function FinanceLogs(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (props.doctors !== undefined && props.doctors !== {}) {
      let tempRows = [];
      // eslint-disable-next-line array-callback-return
      Object.keys(props.doctors).map((key) => {
        if (props.doctors[key].PendingPayments !== 0 && props.doctors[key].PendingPayments!==undefined) {
          tempRows.push(
            createData(
              key,
              props.doctors[key].Name,
              props.doctors[key].Department,
              props.doctors[key].DOR,
              props.doctors[key].Gender,
              <Button
                onClick={() => {
                  props.setDoctorProfileId(key);
                  props.setDoctor(props.doctors);
                  props.setView(8);
                }}
                variant="contained"
                color="primary"
                size="small"
              >
                Logs
              </Button>
            )
          );
        }

        setRows(tempRows);
      });
    }
  }, [props]);

  return (
    <div>
      <Typography component="h1" variant="h4" color="secondary" gutterBottom>
        Doctors Finance Logs
      </Typography>
      <>
        {rows.length === 0 ? (
          <Paper className={classes.default}>
            <Typography variant="h4" color="secondary">
              No pending finance logs
            </Typography>
          </Paper>
        ) : (
          <Paper className={classes.root}>
            <>
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
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          </Paper>
        )}
      </>
    </div>
  );
}
