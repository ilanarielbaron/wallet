import React from "react";
import { Button, CardContent } from "decentraland-ui";
import "./Wallet.css";
import { IWallet } from "../../store/wallet/types";

interface WContentProps {
  setIsTransferOpen: (isTransferOpen: boolean) => void;
  wallet: IWallet;
}

export const WalletContent = ({ setIsTransferOpen, wallet }: WContentProps) => (
  <CardContent>
    <h2>Wallet</h2>
    <p>
      <span className="bold">Address:</span> {wallet.address}
    </p>
    <p>
      <span className="bold">Balance:</span> {wallet.balance} {wallet.symbol}
      <Button basic onClick={() => setIsTransferOpen(true)}>
        Transfer
      </Button>
    </p>
  </CardContent>
);
