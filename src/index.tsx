import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import Context from "./context/CountContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <>
    <BrowserRouter basename="/">
      <Context>
        <Provider store={store}>
          <App />

          <React.StrictMode></React.StrictMode>
        </Provider>
      </Context>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

reportWebVitals();
