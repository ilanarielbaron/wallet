import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Divider, Footer, Navbar } from "decentraland-ui";
import { Routes } from "./components/Routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { fetchWalletRequest } from "./store/wallet/actions";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { getErrorSelector } from "./store/wallet/selectors";
import { toast } from "react-toastify";

declare global {
  interface Window {
    ethereum: any;
  }
}

const App = () => {
  const [isDappEnabled, setIsDappEnabled] = useState(true);
  const ethereum = window.ethereum;
  const dispatch = useDispatch();
  const error = useSelector(getErrorSelector);
  const intl = useIntl();

  const handleConnect = useCallback(() => {
    dispatch(fetchWalletRequest());
  }, [dispatch]);

  useEffect(() => {
    setIsDappEnabled(!!ethereum);
  }, [ethereum]);

  useEffect(() => {
    if (error) {
      toast.error(
        intl.formatMessage({
          id: error,
          defaultMessage: "There is an unexpected error",
        })
      );
    }
  }, [error, intl]);

  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleConnect);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleConnect);
    };
  }, [handleConnect]);

  return (
    <>
      <Navbar isFullscreen />
      <Divider />
      <ToastContainer autoClose={3500} />
      <Router>
        <Routes />
        {!isDappEnabled && <Redirect to="/no-wallet" />}
      </Router>
      <Footer />
    </>
  );
};

export default App;
