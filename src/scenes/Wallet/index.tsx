import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletSelector } from "../../store/wallet/selectors";
import { Redirect } from "react-router-dom";
import { Card } from "decentraland-ui";
import "./Wallet.css";
import { TransferModal } from "../../components/Transfer";
import { WalletContent } from "./WalletContent";
import { ITransfer, IWallet } from "../../store/wallet/types";
import { fetchTransferRequest } from "../../store/wallet/actions";

export const Wallet = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const wallet: IWallet = useSelector(getWalletSelector);
  const dispatch = useDispatch();

  const handleSubmitTransfer = (transferData: ITransfer) => {
    dispatch(fetchTransferRequest({ wallet: wallet, transfer: transferData }));
  };

  if (!wallet.address || !wallet.balance) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Card centered>
        <WalletContent setIsTransferOpen={setIsTransferOpen} wallet={wallet} />
      </Card>
      <TransferModal
        balance={wallet.balance}
        isTransferOpen={isTransferOpen}
        setIsTransferOpen={setIsTransferOpen}
        handleSubmitTransfer={handleSubmitTransfer}
        myAddress={wallet.address}
      />
    </>
  );
};
