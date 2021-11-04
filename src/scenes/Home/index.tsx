import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

  const handleConnect = useCallback(() => {
    dispatch(fetchWalletRequest());
  }, [dispatch]);

  return (
    <>
      {!wallet.isConnected ? (
        <Connect handleConnect={handleConnect} pending={pending} />
      ) : (
        <Redirect to="/wallet" />
      )}
    </>
  );
};
