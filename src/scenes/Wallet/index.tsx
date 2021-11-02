import { useSelector } from "react-redux";
import { getWalletSelector } from "../../store/wallet/selectors";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardContent } from "decentraland-ui";
import "./Wallet.css";
import { TransferModal } from "../../components/Transfer";

export const Wallet = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const wallet = useSelector(getWalletSelector);

  if (!wallet.address) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Card>
        <CardContent>
          <h2>Wallet</h2>
          <p>
            <span className="bold">Address:</span> {wallet.address}
          </p>
          <p>
            <span className="bold">Balance:</span> {wallet.balance}{" "}
            {wallet.symbol}
            <Button basic onClick={() => setIsTransferOpen(true)}>
              Transfer
            </Button>
          </p>
        </CardContent>
      </Card>
      <TransferModal
        isTransferOpen={isTransferOpen}
        setIsTransferOpen={setIsTransferOpen}
      />
    </>
  );
};
