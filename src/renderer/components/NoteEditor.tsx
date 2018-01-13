import React from "react";
import * as classNames from "classnames";
import { Note } from "../../common/entities/Note";
import { Controlled } from "react-codemirror2";

interface Props {
  note?: Note;
  isEditing: boolean;
  isSaving: boolean;
  onChangeNote(note: Note): void;
}

export const NoteEditor: React.SFC<Props> = props => {
  const { note, isEditing, isSaving, onChangeNote } = props;

  return (
    <div className="noteEditor">
      {note !== undefined
        ? <div>
            <Controlled
              value={note.text}
              options={{
                mode: "gfm",
                theme: "railscasts",
                lineNumbers: true,
              }}
              onBeforeChange={(editor, data, value) => {
                onChangeNote(note.set("text", value));
              }}
            />
            <div className="noteEditor_controls">
              <span>
                <span className={classNames({
                  noteEditor_controls_spinner: true,
                  isSaving,
                  isEditing,
                })}>
                  <i className="fas fa-spinner fa-pulse"  />
                </span>
                <span className={classNames({
                  noteEditor_controls_saveButton: true,
                  isSaving,
                  isEditing,
                })}>
                  <i className="fas fa-save" />
                </span>
              </span>
            </div>
          </div>
        : <p>TODO</p>}
    </div>
  );
};
