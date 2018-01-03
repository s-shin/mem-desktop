import { ActionTypes } from "../constants/ActionTypes";
import { Note } from "../../common/entities/Note";
import { Dispatch, ActionCreator } from "redux";
import { RootState } from "../reducers/index";

export interface SaveNoteStartAction {
  type: ActionTypes.SAVE_NOTE_START;
}

export interface SaveNoteDoneAction {
  type: ActionTypes.SAVE_NOTE_DONE;
  note: Note;
}

export interface SaveNoteErrorAction {
  type: ActionTypes.SAVE_NOTE_ERROR;
}

export type SaveNoteActions = SaveNoteStartAction | SaveNoteDoneAction | SaveNoteErrorAction;

export const saveNote: ActionCreator<any> =
    (note: Note) =>
    async (dispatch: Dispatch<SaveNoteActions>, getState: () => RootState) => {
  dispatch({ type: ActionTypes.SAVE_NOTE_START });
  await new Promise(resolve => { setTimeout(() => resolve(), 1000); });
  dispatch({ type: ActionTypes.SAVE_NOTE_DONE, note });
};
