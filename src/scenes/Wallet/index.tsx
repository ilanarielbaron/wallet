import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getErrorSelector,
  getWalletSelector,
} from "../../store/wallet/selectors";
import { Redirect } from "react-router-dom";
import { Card } from "decentraland-ui";
import "./Wallet.css";
import { TransferModal } from "../../components/Transfer";
import { WalletContent } from "./WalletContent";

export const Wallet = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const wallet = useSelector(getWalletSelector);
  const error = useSelector(getErrorSelector);

  if (!wallet.address || error) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Card>
        <WalletContent setIsTransferOpen={setIsTransferOpen} wallet={wallet} />
      </Card>
      <TransferModal
        isTransferOpen={isTransferOpen}
        setIsTransferOpen={setIsTransferOpen}
      />
    </>
  );
};
