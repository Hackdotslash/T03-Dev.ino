/* eslint-disable array-callback-return */
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
  Checkbox,
  Grid,
  TextField,
  Button,
  Box,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { updateLogs } from "../functions";

const columns = [
  { id: "name", label: "Patient Name", minWidth: 140 },
  { id: "age", label: "Patient Age", minWidth: 110 },
  { id: "date", label: "Consultation Date", minWidth: 140 },
  { id: "phone", label: "Contact No.", minWidth: 140 },
  { id: "status", label: "Status", minWidth: 140 },
];

function createData(name, age, date, phone, status) {
  return { name, age, date, phone, status };
}

const useStyles = makeStyles((theme) => ({
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
  feesTitle: {
    display: "flex",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const today = new Date();
const date =
  today.getDate() +
  "/" +
  (parseInt(today.getMonth()) + 1).toString() +
  "/" +
  today.getFullYear() +
  " - " +
  today.getHours("HH") +
  ":" +
  today.getMinutes("MM");

export default function DoctorLogs(props) {
  const classes = useStyles();
  const [log, setLog] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedPatients, setSelectedPatients] = React.useState([]);
  const [totalPayment, setTotalPayment] = React.useState(0);
  const [patient, setPatient] = React.useState(
    props.doctor[props.doctorProfileId].PatientLog
  );
  const [open, setOpen] = React.useState(false);
  const [transactionDetails, setTransactionDetails] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = (value, key) => {
    console.log(value, key);

    let list = selectedPatients;
    if (value) {
      list.push(key);
    } else {
      list.splice(list.indexOf(key), 1);
    }
    setSelectedPatients(list);
    setTotalPayment(props.doctor[props.doctorProfileId].feesUSD * list.length);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = () => {
    let data = patient;
    selectedPatients.map((value) => {
      console.log(value);
      data[value].PaymentStatus = 1;
    });

    let transactionID = props.doctor[props.doctorProfileId].TransactionID;

    let transactionData = {
      [transactionID + 1]: {
        TransactionDetails: transactionDetails,
        PatientIDs: selectedPatients,
        Date: date,
        Amount: totalPayment,
      },
    };

    // console.log(data);
    setTableData(data);
    setPatient(data);
    setTotalPayment(0);
    // calling firebase function to update logs
    const len =
      props.doctor[props.doctorProfileId].PendingPayments -
      selectedPatients.length;
    updateLogs(
      data,
      props.doctorProfileId,
      len,
      transactionData,
      transactionID
    );
    handleClose();
  };

  function setTableData(patient) {
    let rows = [];

    Object.keys(patient).map((key) => {
      if (patient[key].PaymentStatus === 0) {
        console.log(key);
        rows.push(
          createData(
            patient[key].Name,
            patient[key].Age,
            patient[key].Date,
            patient[key].Phone_no,
            <Checkbox
              // checked={false}
              id={key}
              defaultChecked={false}
              onChange={(e) => handleCheck(e.target.checked, key)}
            />
          )
        );
      }
    });
    setLog(rows);
  }

  React.useEffect(() => {
    if (props.doctor !== undefined && patient !== undefined) {
      setTableData(patient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography
        variant="h5"
        color="secondary"
        style={{ textAlign: "center", margin: 8 }}
      >
        Doctor's Payment Log
      </Typography>
      {Object.entries(log).length === 0 ? (
        <Paper className={classes.default}>
          <Typography variant="h4" color="secondary">
            No Pending Payments
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

      <Box style={{ margin: 16 }}>
        <Grid container>
          <Grid item xs={4} className={classes.feesTitle}>
            <Typography gutterBottom variant="body1">
              <b>Total Fees:</b>
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={totalPayment}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              // onClick={handleClick}
              onClick={handleOpen}
              variant="contained"
              color="primary"
              disabled={totalPayment === 0}
            >
              Pay Fees
            </Button>
          </Grid>
        </Grid>
      </Box>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.modalPaper}>
              <h2 id="transition-modal-title">Enter Transaction Details</h2>
              <p id="transition-modal-description">
                <TextField
                  fullWidth
                  id="filled-textarea"
                  label="Transaction Details"
                  multiline
                  variant="filled"
                  rows={4}
                  onChange={(e) => setTransactionDetails(e.target.value)}
                />
              </p>
              <p id="transition-modal-description">
                <TextField
                  fullWidth
                  id="filled-textarea"
                  // placeholder="Patient IDs"
                  variant="outlined"
                  value={selectedPatients}
                />
              </p>
              <p id="transition-modal-description">
                <TextField
                  fullWidth
                  id="filled-textarea"
                  value={date}
                  variant="outlined"
                />
              </p>
              <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                disabled={transactionDetails === ""}
              >
                Paid
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
