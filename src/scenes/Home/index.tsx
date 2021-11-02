import { useDispatch, useSelector } from "react-redux";
import {
  getErrorSelector,
  getPendingSelector,
  getWalletSelector,
} from "../../store/wallet/selectors";
import React, { useCallback, useEffect } from "react";
import { fetchWalletRequest } from "../../store/wallet/actions";
import { Button, Loader } from "decentraland-ui";
import { Redirect } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const wallet = useSelector(getWalletSelector);
  const error = useSelector(getErrorSelector);

  const handleConnect = useCallback(() => {
    dispatch(fetchWalletRequest());
  }, [dispatch]);

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      if (!accounts.length) {
        console.log("Error");
      } else {
        handleConnect();
      }
    });
  }, [handleConnect]);

  return (
    <>
      {pending ? (
        <Button primary onClick={handleConnect}>
          <Loader active inline="centered" size="tiny" />
        </Button>
      ) : error ? (
        <div>Error</div>
      ) : !wallet.isConnected ? (
        <Button primary onClick={handleConnect}>
          Connect
        </Button>
      ) : (
        <Redirect to="/wallet" />
      )}
    </>
  );
};
