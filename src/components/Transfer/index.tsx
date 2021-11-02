import React from "react";
import { Icon, Modal, ModalDescription, ModalHeader } from "decentraland-ui";

interface Props {
  isTransferOpen: boolean;
  setIsTransferOpen: (isTransferOpen: boolean) => void;
}

export const TransferModal = ({ isTransferOpen, setIsTransferOpen }: Props) => (
  <Modal
    open={isTransferOpen}
    closeOnTriggerClick
    closeOnEscape
    centered
    size="small"
  >
    <ModalHeader>
      <div>
        <h2>Transfer</h2>
        <Icon onClick={() => setIsTransferOpen(false)} />
      </div>
    </ModalHeader>
    <ModalDescription>
      <p>Send tokens to an account</p>
    </ModalDescription>
  </Modal>
);
