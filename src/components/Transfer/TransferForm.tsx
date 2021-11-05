import React from "react";
import { Field, Form, FormButton } from "decentraland-ui";
import "./Transfer.css";
import { useTransferForm } from "./useTransferForm";
import { useIntl } from "react-intl";

export interface Transfer {
  amount: number;
  address: string;
}

interface TransferFormProps {
  handleSubmit: (values: Transfer) => void;
  balance: number;
  myAddress: string;
}

export const TransferForm = ({
  handleSubmit,
  balance,
  myAddress,
}: TransferFormProps) => {
  const intl = useIntl();
  const {
    setAmount,
    setAddress,
    handleFormSubmit,
    setAmountError,
    amountError,
    addressError,
    setAddressError,
  } = useTransferForm({ handleSubmit, myAddress, balance });

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
            const error = intl.formatMessage({ id: "amountGenericError" });
            setAmountError({
              hasError: true,
              message: error,
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
            const error = intl.formatMessage({ id: "addressGenericError" });
            setAddressError({
              hasError: true,
              message: error,
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
