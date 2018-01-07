import "./common.scss";
import "./vendor/fontawesome-all";

import { setCodeMirror } from "./components/react-codemirror2";
//---
/* tslint:disable:no-var-requires */
// NOTE: Why importing codemirror modules by `require` with relative paths?
// Because each plugin code imports lib/codemirror by `require` with the relative path
// (e.g. https://github.com/codemirror/CodeMirror/blob/5.33.0/mode/clike/clike.js#L5-L6),
// but the required codemirror instance is different from
// the one imported by `import * as codemirror from "codemirror"`.
setCodeMirror(require("../../node_modules/codemirror/lib/codemirror"));
require("../../node_modules/codemirror/mode/gfm/gfm");
require("../../node_modules/codemirror/mode/javascript/javascript");
require("../../node_modules/codemirror/keymap/vim");
/* tslint:enable:no-var-requires */
//---

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
