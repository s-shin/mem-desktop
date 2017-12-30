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
  <div class="app">
    <div class="app_sideMenu">
      <div class="app_sideMenu_section">
        <div class="app_sideMenu_section_header">
          <h2>Notes</h2>
        </div>
        <div class="app_sideMenu_section_body">
          <ul>
            {[...Array(20).keys()].map(() => (
              <li>
                <h3>Hello</h3>
                <p>World!</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div class="app_main">
      <textarea />
    </div>
  </div>
);

export const main = app(state, actions, view, document.body);
