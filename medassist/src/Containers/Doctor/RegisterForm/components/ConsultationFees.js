import React from "react";
import axios from "axios";
import { InputAdornment, TextField } from "@material-ui/core";

export default function ConsultationFees(props) {
  const [currencies, setCurrencies] = React.useState([]);
  React.useEffect(() => {
    axios.get("https://api.exchangeratesapi.io/latest").then((response) => {
      // Initialized with 'EUR' because the base currency is 'EUR'
      // and it is not included in the response
      const currencyAr = [];
      for (const key in response.data.rates) {
        currencyAr.push(key);
      }
      setCurrencies(currencyAr);
    });
  }, []);

  const handleChange = (event) => {
    const data = event.target.value;

    axios
      .get(
        `https://api.openrates.io/latest?base=${props.value.currType}&symbols=USD`
      )
      .then((response) => {
        let result = data * response.data.rates["USD"];
        result = result.toFixed(2);
        props.setValue({ ...props.value, amountUSD: result, amount: data });
      })
      .catch((err) => {
        console.log("Opps", err.message);
      });
  };

  const handleChangeCurr = (event) => {
    const data = event.target.value;
    console.log(event.target.value);
    props.setValue({ ...props.value, currType: event.target.value });

    axios
      .get(`https://api.openrates.io/latest?base=${data}&symbols=USD`)
      .then((response) => {
        let result = props.value.amount * response.data.rates["USD"];
        result = result.toFixed(2);
        // console.log(result);
        props.setValue({ ...props.value, amountUSD: result, currType: data });
      })
      .catch((err) => {
        console.log("Opps", err.message);
      });
  };

  return (
    <div>
      <TextField
        id="fees"
        name="fees"
        label="Enter Consultation Fees"
        value={props.value.amount}
        color="secondary"
        fullWidth
        autoComplete="Doc Links"
        error={props.value.isError.amount}
        helperText={
          props.value.isError.amount && "Please enter your consultation fees"
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <select
                name="from"
                onChange={handleChangeCurr}
                value={props.value.currType}
              >
                {currencies.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>
            </InputAdornment>
          ),
        }}
        onChange={props.getAmount}
        onBlur={handleChange}
      />
    </div>
  );
}
