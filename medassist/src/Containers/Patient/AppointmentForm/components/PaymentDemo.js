import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentDemo() {
  const fees = 100;
  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AWChTAgzHNpEJmmRujlBRhOVTagS2-kHdSqpHGtB4iGPdoo3pWkjQtvvpWmg85RHGTZCNk9Z25XB2Z3V",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", label: "pay" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: fees,
                  },
                },
              ],
            });
          }}
          onClick={() => {}}
          onApprove={(details) => {
            alert("Payment Successfull with ID: " + details.orderID);
          }}
          onCancel={() => {
            alert("payment cancelled by user");
          }}
          onError={(error) => {
            console.log("Error.!", error);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
