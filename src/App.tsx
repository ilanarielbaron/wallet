import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Divider, Footer, Navbar } from "decentraland-ui";
import { Routes } from "./components/Routes";

declare global {
  interface Window {
    ethereum: any;
  }
}

const App = () => {
  const [isDappEnabled, setIsDappEnabled] = useState(true);
  useEffect(() => {
    setIsDappEnabled(!!window.ethereum);
  }, []);

  return (
    <>
      <Navbar isFullscreen />
      <Divider />
      <Router>
        <Routes />
        {!isDappEnabled && <Redirect to="/no-wallet" />}
      </Router>
      <Footer />
    </>
  );
};

export default App;
