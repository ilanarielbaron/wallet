import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransferSuccessSelector,
  getWalletSelector,
} from "../../store/wallet/selectors";
import { Redirect } from "react-router-dom";
import { Card } from "decentraland-ui";
import "./Wallet.css";
import { TransferModal } from "../../components/Transfer";
import { WalletContent } from "./WalletContent";
import { ITransfer, IWallet } from "../../store/wallet/types";
import { fetchTransferRequest } from "../../store/wallet/actions";

/** Wallet component which shows the account and the transfer modal */
export const Wallet = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const wallet: IWallet = useSelector(getWalletSelector);
  const isTransferSuccess = useSelector(getTransferSuccessSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTransferSuccess) {
      setIsTransferOpen(false);
    }
  }, [isTransferSuccess]);

  /** Effect to check if is there any changes in the metamask accounts */
  useEffect(() => {
    window.ethereum?.on("accountsChanged", () => {
      setIsTransferOpen(false);
    });
    return () => {
      window.ethereum?.removeListener("accountsChanged", () => {
        setIsTransferOpen(false);
      });
    };
  }, []);

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
