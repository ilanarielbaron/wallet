import React from "react";
import { Button, CardContent } from "decentraland-ui";
import { IWallet } from "../../store/wallet/types";
import { parseAddress } from "../../utils/extra";
import "./Wallet.css";

interface WContentProps {
  setIsTransferOpen: (isTransferOpen: boolean) => void;
  wallet: IWallet;
}

export const WalletContent = ({ setIsTransferOpen, wallet }: WContentProps) => (
  <CardContent className="wallet-content">
    <h2>Wallet</h2>
    <p>
      <span className="bold">Address:</span>{" "}
      {parseAddress(wallet.address ?? "")}
    </p>
    <div className="balance">
      <span className="bold">Balance:</span> {wallet.balance} {wallet.symbol}
      <Button basic onClick={() => setIsTransferOpen(true)}>
        Transfer
      </Button>
    </div>
  </CardContent>
);
