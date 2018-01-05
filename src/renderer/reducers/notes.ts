import { Map, Record } from "immutable";
import { NoteId, Note } from "../../common/entities/Note";
import { ActionTypes } from "../constants/ActionTypes";
import { SaveNoteActions, LoadNotesActions } from "../actions/note";

export class NotesState extends Record({
  notes: Map<NoteId, Note>(),
  isSaving: false,
}) {}

export const notes = (state = new NotesState(), action: SaveNoteActions | LoadNotesActions) => {
  switch (action.type) {
    case ActionTypes.SAVE_NOTE_START: {
      return state.set("isSaving", true);
    }
    case ActionTypes.SAVE_NOTE_DONE: {
      return state.withMutations(mut => mut
        .set("isSaving", false)
        .update("notes", x => x.set(action.note.id, action.note)));
    }
    case ActionTypes.SAVE_NOTE_ERROR: {
      return state.set("isSaving", false);
    }
    case ActionTypes.LOAD_NOTES_START: {
      // TODO
      return state;
    }
    case ActionTypes.LOAD_NOTES_DONE: {
      return state.set("notes", action.notes);
    }
    case ActionTypes.LOAD_NOTES_ERROR: {
      // TODO
      return state;
    }
    default: {
      return state;
    }
  }
};
