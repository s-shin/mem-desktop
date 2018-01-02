import { Map, Record } from "immutable";
import { NoteId, Note } from "../../common/entities/Note";
import { Action } from "redux";
import { ActionTypes } from "../constants/ActionTypes";
import { AddNoteAction, DeleteNoteAction, UpdateNoteAction } from "../actions/note";

type Actions = AddNoteAction | DeleteNoteAction | UpdateNoteAction;

export class NotesState extends Record({
  notes: Map<NoteId, Note>(),
}) {}

const notesReducer = (state = new NotesState({
  notes: Map<number, Note>(
    Array(10).fill(0).map(
      (_0, i) => [
        i + 1,
        new Note({ id: i + 1, text: `foo${i + 1}\nbar\nfoobar` }),
      ] as [number, Note],
    ),
  ),
}), action: Actions) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTE: case ActionTypes.UPDATE_NOTE: {
      return state.update("notes", x => x.set(action.note.id, action.note));
    }
    case ActionTypes.DELETE_NOTE: {
      return state.update("notes", x => x.remove(action.noteId));
    }
    default: {
      return state;
    }
  }
};

// workaround for https://github.com/reactjs/redux/issues/2709
export const notes = (state: NotesState, action: Action) => notesReducer(state, action as Actions);
