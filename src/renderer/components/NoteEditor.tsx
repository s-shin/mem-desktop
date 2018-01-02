import React from "react";
import { Note } from "../../common/entities/Note";

interface Props {
  note?: Note;
  onChangeNote(note: Note): void;
}

export const NoteEditor: React.SFC<Props> = props => {
  const { note, onChangeNote } = props;
  return (
    <div className="noteEditor">
      {note
        ? <textarea
          value={note.text}
          placeholder="title\n\ncontent..."
          onChange={e => onChangeNote(note.set("text", e.target.value))}
          ></textarea>
        : <p>TODO</p>}
    </div>
  );
};
