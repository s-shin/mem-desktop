import { Map } from "immutable";
import { NoteId, Note } from "../entities/Note";

type NoteMap = Map<NoteId, Note>;

export interface NoteRepository {
  FetchNotes(): Promise<NoteMap>;
  SaveNote(note: Note): Promise<boolean>;
}
