import { Route, Switch } from "react-router-dom";
import { Home } from "../../scenes/Home";
import { NoWallet } from "../../scenes/NoWallet";
import React from "react";
import { Wallet } from "../../scenes/Wallet";
import { Page } from "decentraland-ui";
import "./general.css";

export const Routes = () => {
  return (
    <Page className="container">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/wallet" exact component={Wallet} />
        <Route path="/no-wallet" exact component={NoWallet} />
      </Switch>
    </Page>
  );
};
