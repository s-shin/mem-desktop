import { ActionTypes } from "../constants/ActionTypes";
import { NoteId, Note } from "../../common/entities/Note";

export interface AddNoteAction {
  type: ActionTypes.ADD_NOTE;
  note: Note;
}

export interface DeleteNoteAction {
  type: ActionTypes.DELETE_NOTE;
  noteId: NoteId;
}

export interface UpdateNoteAction {
  type: ActionTypes.UPDATE_NOTE;
  note: Note;
}

export function updateNote(note: Note): UpdateNoteAction {
  return {
    type: ActionTypes.UPDATE_NOTE,
    note,
  };
}
