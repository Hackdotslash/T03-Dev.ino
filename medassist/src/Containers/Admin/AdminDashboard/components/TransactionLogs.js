import React from "react";
import {
  Grid,
  Card,
  InputBase,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@material-ui/core";

export default function TransactionLogs(props) {
  let data = props.doctor[props.doctorProfileId].TransactionLogs;
  return (
    <div>
      <Typography component="h1" variant="h4" color="secondary" gutterBottom>
        Transaction Logs
      </Typography>
      <>
        <Grid container spacing={3}>
          {data === undefined || Object.keys(data).length === 0 ? (
            <Paper
              style={{
                display: "flex",
                width: "100%",
                height: 440,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" color="secondary">
                No transaction logs{" "}
              </Typography>
            </Paper>
          ) : (
            <>
              {Object.keys(data).map((id) => (
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="feedback"
                          style={{ background: "#BBE1FA" }}
                        >
                          {id}
                        </Avatar>
                      }
                      title={"$" + data[id].Amount}
                      subheader={data[id].Date}
                    />
                    <CardContent>
                      <InputBase
                        fullWidth
                        multiline="true"
                        rowsMax={4}
                        rows={4}
                        defaultValue={data[id].TransactionDetails}
                      />
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel htmlFor="patientLabel">
                          Patient Ids{" "}
                        </InputLabel>

                        <Select fullWidth labelId="patientLabel">
                          {/* <MenuItem selected></MenuItem> */}
                          {Object.keys(data[id].PatientIDs).map((key) => (
                            <MenuItem disabled>
                              {data[id].PatientIDs[key]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}{" "}
        </Grid>
      </>
    </div>
  );
}
