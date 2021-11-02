import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getErrorSelector,
  getPendingSelector,
  getWalletSelector,
} from "../../store/wallet/selectors";
import { fetchWalletRequest } from "../../store/wallet/actions";
import { Redirect } from "react-router-dom";
import { Connect } from "../../components/Connect";

export const Home = () => {
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const wallet = useSelector(getWalletSelector);
  const error = useSelector(getErrorSelector);

  const handleConnect = useCallback(() => {
    dispatch(fetchWalletRequest());
  }, [dispatch]);

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      handleConnect();
    });
  }, [handleConnect]);

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : !wallet.isConnected ? (
        <Connect handleConnect={handleConnect} pending={pending} />
      ) : (
        <Redirect to="/wallet" />
      )}
    </>
  );
};
