import { Map } from "immutable";
import { ActionTypes } from "../constants/ActionTypes";
import { Note, NoteId } from "../../common/entities/Note";
import { Dispatch, ActionCreator } from "redux";
import { RootState } from "../reducers/index";
import { FileStorage } from "../storage/FileStorage";

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

export const saveNote: ActionCreator<any> = (note: Note) => async (dispatch: Dispatch<SaveNoteActions>, getState: () => RootState) => {
  dispatch({ type: ActionTypes.SAVE_NOTE_START });
  try {
    const storage = new FileStorage();
    await storage.saveNote(note);
    dispatch({ type: ActionTypes.SAVE_NOTE_DONE, note });
  } catch (e) {
    console.warn(e);
    dispatch({ type: ActionTypes.SAVE_NOTE_ERROR });
  }
};

//---

export interface LoadNotesStartAction {
  type: ActionTypes.LOAD_NOTES_START;
}

export interface LoadNotesDoneAction {
  type: ActionTypes.LOAD_NOTES_DONE;
  notes: Map<NoteId, Note>;
}

export interface LoadNotesErrorAction {
  type: ActionTypes.LOAD_NOTES_ERROR;
}

export type LoadNotesActions = LoadNotesStartAction | LoadNotesDoneAction | LoadNotesErrorAction;

export const loadNotes: ActionCreator<any> = () => async (dispatch: Dispatch<LoadNotesActions>, getState: () => RootState) => {
  dispatch({ type: ActionTypes.LOAD_NOTES_START });
  try {
    const storage = new FileStorage();
    const ids = await storage.getNoteIds();
    const notes = await Promise.all(ids.map(id => storage.loadNote(id)));
    dispatch({
      type: ActionTypes.LOAD_NOTES_DONE,
      notes: Map(ids.map((id, i) => [id, notes[i]])),
    });
  } catch (e) {
    console.warn(e);
    dispatch({ type: ActionTypes.LOAD_NOTES_ERROR });
  }
};
