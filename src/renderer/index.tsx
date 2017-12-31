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
          <h2>
            <i class="far fa-file-alt" /> Notes
            <span class="app_sideMenu_section_header_button" style={{float: "right"}}>
              <i class="fas fa-plus" />
            </span>
            <span class="app_sideMenu_section_header_button">
              <i class="fas fa-caret-down" />
            </span>
          </h2>
        </div>
        <div class="app_sideMenu_section_body">
          <ul>
            {[...Array(5).keys()].map((i) => (
              <li class={i == 2 ? "is-active" : ""}>
                <h3>Hello {i}</h3>
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
