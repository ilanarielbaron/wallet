import { useSelector } from "react-redux";
import { getWalletSelector } from "../../store/wallet/selectors";
import React from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent } from "decentraland-ui";
import "./Wallet.css";

export const Wallet = () => {
  const wallet = useSelector(getWalletSelector);

  if (!wallet.address) {
    return <Redirect to="/" />;
  }

  return (
    <Card>
      <CardContent>
        <h2>Wallet</h2>
        <p>
          <span className="bold">Address:</span> {wallet.address}
        </p>
        <p>
          <span className="bold">Balance:</span> {wallet.balance}{" "}
          {wallet.symbol}
        </p>
      </CardContent>
    </Card>
  );
};
