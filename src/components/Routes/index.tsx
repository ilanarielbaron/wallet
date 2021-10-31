import {Route, Switch} from "react-router-dom";
import {Home} from "../../scenes/Home";
import {NoWallet} from "../../scenes/NoWallet";
import React from "react";

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path='/no-wallet' exact component={NoWallet} />
        </Switch>
        )
}
