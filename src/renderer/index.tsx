import "./common.scss";
import "./vendor/fontawesome-all";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router";
import createHistory from "history/createBrowserHistory";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
import { Home } from "./containers/Home";

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    router: routerReducer,
  }),
  applyMiddleware(middleware),
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
