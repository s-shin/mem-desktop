import { h, app } from "hyperapp";

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
  <div>
    <p>count: {state.count}</p>
    <button onclick={actions.up}>Up</button>
    <button onclick={actions.down}>Down</button>
  </div>
);

export const main = app(state, actions, view, document.getElementById("app")!);
