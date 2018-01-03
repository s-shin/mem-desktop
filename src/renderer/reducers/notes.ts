import { Map, Record } from "immutable";
import { NoteId, Note } from "../../common/entities/Note";
import { ActionTypes } from "../constants/ActionTypes";
import { SaveNoteActions } from "../actions/note";

export class NotesState extends Record({
  notes: Map<NoteId, Note>(
    // FIXME: mock
    Array(10).fill(0).map(
      (_0, i) => [
        i + 1,
        new Note({ id: i + 1, text: `foo${i + 1}\nbar\nfoobar` }),
      ] as [number, Note],
    ),
  ),
  isSaving: false,
}) {}

export const notes = (state = new NotesState(), action: SaveNoteActions) => {
  switch (action.type) {
    case ActionTypes.SAVE_NOTE_START: {
      return state.set("isSaving", true);
    }
    case ActionTypes.SAVE_NOTE_DONE: {
      return state.set("isSaving", false);
    }
    case ActionTypes.SAVE_NOTE_ERROR: {
      return state.set("isSaving", false);
    }
    default: {
      return state;
    }
  }
};
