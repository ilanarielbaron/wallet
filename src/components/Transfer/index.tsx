import React from "react";
import { Center, Close, Modal } from "decentraland-ui";
import "./Transfer.css";
import { TransferForm } from "./TransferForm";
import { ITransfer } from "../../store/wallet/types";

interface Props {
  isTransferOpen: boolean;
  setIsTransferOpen: (isTransferOpen: boolean) => void;
  handleSubmitTransfer: (values: ITransfer) => void;
  balance: number;
  myAddress: string;
}

export const TransferModal = ({
  isTransferOpen,
  setIsTransferOpen,
  handleSubmitTransfer,
  balance,
  myAddress,
}: Props) => {
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
        <TransferForm
          handleSubmit={handleSubmitTransfer}
          balance={balance}
          myAddress={myAddress}
        />
      </Modal.Content>
    </Modal>
  );
};
