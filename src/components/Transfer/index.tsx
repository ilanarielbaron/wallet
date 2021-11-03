import React, { useState } from "react";
import { Center, Close, Field, Form, FormButton, Modal } from "decentraland-ui";
import "./Transfer.css";

export interface Transfer {
  amount: number
  address: string
}

interface Props {
  isTransferOpen: boolean;
  setIsTransferOpen: (isTransferOpen: boolean) => void;
  handleSubmitTransfer: (values: Transfer) => void
}

export const TransferModal = ({ isTransferOpen, setIsTransferOpen, handleSubmitTransfer }: Props) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountHasError, setAmountHasError] = useState(false);
  const [addressHasError, setAddressHasError] = useState(false);

  const handleSubmit = () => {
    if (amount === 0) {
      setAmountHasError(true);
    }

    if (address === "") {
      setAddressHasError(true);
    }

    if (addressHasError || amountHasError) return;

    handleSubmitTransfer({address, amount});
  };

  return (
    <Modal
      open={isTransferOpen}
      closeOnTriggerClick
      closeOnEscape
      centered
      size="tiny"
      onClose={() => {
        setIsTransferOpen(false);
      }}
    >
      <Modal.Header>
        <Center>
          <div className="title">Transfer</div>
          <Close
            onClick={() => {
              setIsTransferOpen(false);
            }}
          />
          <p className="description">Send tokens to an account</p>
        </Center>
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Field
            type="text"
            label="AMOUNT"
            onChange={(e) => {
              if (!isNaN(+e.target.value)) {
                setAmount(parseInt(e.target.value));
                setAmountHasError(false);
              } else {
                setAmountHasError(true);
              }
            }}
            error={amountHasError}
            message={amountHasError ? "Please insert a valid amount" : ""}
          />
          <Field
            type="text"
            label="ADDRESS"
            onChange={(e) => {
              if (e.target.value !== "") {
                setAddress(e.target.value);
                setAddressHasError(false);
              } else {
                setAddressHasError(true);
              }
            }}
            error={addressHasError}
            message={addressHasError ? "Please insert a valid address" : ""}
          />
          <FormButton primary fluid loading={false}>
            Send
          </FormButton>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
