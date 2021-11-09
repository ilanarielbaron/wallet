import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store";
import App from "./App";
import { messages } from "./lang/messages";
import { IntlProvider } from "react-intl";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale="en" defaultLocale="en" messages={messages["en"]}>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
