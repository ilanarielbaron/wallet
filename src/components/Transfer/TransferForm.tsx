import React, { useState } from "react";
import { Field, Form, FormButton } from "decentraland-ui";
import "./Transfer.css";

export interface Transfer {
  amount: number;
  address: string;
}

interface Props {
  handleSubmit: (values: Transfer) => void;
  balance: number;
  myAddress: string;
}

export const TransferForm = ({ handleSubmit, balance, myAddress }: Props) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState({
    hasError: false,
    message: "",
  });
  const [addressError, setAddressError] = useState({
    hasError: false,
    message: "",
  });

  const handleFormSubmit = () => {
    const isValid = validateAddress();
    if (!isValid) return;

    if (addressError.hasError || amountError.hasError) return;

    handleSubmit({ address, amount });
  };

  const validateAddress = () => {
    let isValid = true;

    if (amount <= 0) {
      setAmountError({
        hasError: true,
        message: "Please insert a valid amount",
      });

      isValid = false;
    }

    if (address === "" || address.toLowerCase() === myAddress.toLowerCase()) {
      setAddressError({
        hasError: true,
        message: "Please insert a valid address",
      });

      isValid = false;
    }

    if (amount > balance) {
      setAmountError({
        hasError: true,
        message: "The amount exceed your balance",
      });

      isValid = false;
    }

    return isValid;
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Field
        type="text"
        label="AMOUNT"
        onChange={(e) => {
          if (!isNaN(+e.target.value)) {
            setAmount(parseInt(e.target.value));
            setAmountError({ hasError: false, message: "" });
          } else {
            setAmountError({
              hasError: true,
              message: "Please insert a valid amount",
            });
          }
        }}
        error={amountError.hasError}
        message={amountError.message}
      />
      <Field
        type="text"
        label="ADDRESS"
        onChange={(e) => {
          if (e.target.value !== "") {
            setAddress(e.target.value);
            setAddressError({ hasError: false, message: "" });
          } else {
            setAddressError({
              hasError: true,
              message: "Please insert a valid address",
            });
          }
        }}
        error={addressError.hasError}
        message={addressError.message}
      />
      <FormButton primary fluid loading={false}>
        Send
      </FormButton>
    </Form>
  );
};
