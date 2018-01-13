import "./common.scss";

import "mem-desktop-fontawesome";

import "codemirror/mode/gfm/gfm";
import "codemirror/mode/javascript/javascript";

import "./sandbox";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, Middleware } from "redux";
import { Provider } from "react-redux";
import { Route } from "react-router";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/index";
import { Home } from "./containers/Home";

const history = createHistory();

const store = createStore(
  rootReducer,
  applyMiddleware(
    routerMiddleware(history) as Middleware,
    thunk,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")!,
);
