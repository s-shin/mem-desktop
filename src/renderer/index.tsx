import { h, app } from "hyperapp";
import "./common.scss";
import "./vendor/fontawesome-all"

interface State {
  count: number;
}

interface Actions {
  up(): (state: State) => State;
  down(): (state: State) => State;
}

const state: State = {
  count: 0,
};

const actions: Actions = {
  up: () => (state: State) => ({ count: state.count + 1 }),
  down: () => (state: State) => ({ count: state.count - 1 }),
};

const view = (state: State, actions: Actions) => (
  <div class="columns is-marginless">
    <div class="column is-one-quarter is-paddingless">
      <div class="container sideMenu">
        <div class="field sideMenu_search">
          <div class="control has-icons-left">
            <input type="text" class="input" />
            <span class="icon is-small is-left">
              <i class="fas fa-search" />
            </span>
          </div>
        </div>
        <p>left</p>
      </div>
    </div>
    <div class="column">
      <div class="container">
        <p>right</p>
      </div>
    </div>
  </div>
);

export const main = app(state, actions, view, document.body);
