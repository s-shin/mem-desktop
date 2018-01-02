import React from "react";
import { Note } from "../../common/entities/Note";

interface Props {
  note: Note;
  onChangeNote(note: Note): void;
}

export class NoteEditor extends React.Component<Props> {
  render() {
    return (
      <div className="noteEditor">
        <textarea
          value={this.props.note.text}
          onChange={e => this.props.onChangeNote(this.props.note.set("text", e.target.value))}
          ></textarea>
      </div>
    );
  }
}
