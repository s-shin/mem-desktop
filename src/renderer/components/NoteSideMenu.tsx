import React from "react";
import { OrderedMap } from "immutable";
import { Note } from "../../common/entities/Note";

interface Props {
  activeNoteId: number;
  notes: OrderedMap<number, Note>;
  onSelectNote: (noteId: number) => void;
}

export class NoteSideMenu extends React.Component<Props> {
  render() {
    return (
      <div className="noteSideMenu">
        <div className="noteSideMenu_header">
          <h2>
            <i className="far fa-file-alt" /> Notes
            <span className="noteSideMenu_header_button" style={{float: "right"}}>
              <i className="fas fa-plus" />
            </span>
            <span className="noteSideMenu_header_button">
              <i className="fas fa-caret-down" />
            </span>
          </h2>
        </div>
        <div className="noteSideMenu_body">
          <ul>
            {this.props.notes.toList().map(note => (
              <li
                className={note.id === this.props.activeNoteId ? "is-active" : ""}
                key={note.id}
                onClick={() => note.id !== this.props.activeNoteId && this.props.onSelectNote(note.id)}>
                <h3>{note.hasTitle() ? note.getTitle() : "(no title)"}</h3>
                {note.hasDescription() && <p>{note.getDescription()}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
