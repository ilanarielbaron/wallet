import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Divider, Footer, Navbar } from "decentraland-ui";
import { Routes } from "./components/Routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { fetchWalletRequest } from "./store/wallet/actions";
import { useDispatch } from "react-redux";
import { IntlProvider } from "react-intl";
import { messages } from "./lang/messages";

declare global {
  interface Window {
    ethereum: any;
  }
}

const App = () => {
  const [isDappEnabled, setIsDappEnabled] = useState(true);
  const etherum = window.ethereum;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsDappEnabled(!!etherum);
  }, [etherum]);

  const handleConnect = useCallback(() => {
    dispatch(fetchWalletRequest());
  }, [dispatch]);

  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleConnect);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleConnect);
    };
  }, [handleConnect]);

  return (
    <>
      <IntlProvider locale="en" defaultLocale="en" messages={messages["en"]}>
        <Navbar isFullscreen />
        <Divider />
        <ToastContainer autoClose={3500} />
        <Router>
          <Routes />
          {!isDappEnabled && <Redirect to="/no-wallet" />}
        </Router>
        <Footer />
      </IntlProvider>
    </>
  );
};

export default App;
