import { NotesState, notes } from "./notes";
import { routerReducer } from "react-router-redux";
import { combineReducers, Reducer } from "redux";

export interface RootState {
  notes: NotesState;
}

export const rootReducer = combineReducers({
  notes: notes as Reducer<any>,
  routerReducer: routerReducer as Reducer<any>,
});
