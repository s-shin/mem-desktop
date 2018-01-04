import React from "react";
import { Note } from "../../common/entities/Note";

interface Props {
  note?: Note;
  isSaving: boolean;
  onChangeNote(note: Note): void;
}

export const NoteEditor: React.SFC<Props> = props => {
  const { note, isSaving, onChangeNote } = props;

  return (
    <div className="noteEditor">
      {note !== undefined
        ? <div>
            <textarea
              value={note.text}
              placeholder="title\n\ncontent..."
              onChange={e => onChangeNote(note.set("text", e.target.value))}
              ></textarea>
            <div className="noteEditor_controls">
              <span>
                <span style={{display: isSaving ? "inline-block" : "none"}}>
                  <i className="fas fa-spinner fa-pulse"  />
                </span>
                <span style={{display: isSaving ? "none" : "inline-block"}}>
                  <i className="fas fa-save" />
                </span>
              </span>
            </div>
          </div>
        : <p>TODO</p>}
    </div>
  );
};
