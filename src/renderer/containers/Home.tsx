import React from "react";
import { OrderedMap } from "immutable";
import { NoteSideMenu } from "../components/NoteSideMenu";
import { NoteEditor } from "../components/NoteEditor";
import { Note } from "../../common/entities/Note";

interface State {
  notes: OrderedMap<number, Note>;
  activeNoteId: number;
}

export class Home extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      notes: OrderedMap<number, Note>(
        Array(10).fill(0).map(
          (_0, i) => [
            i + 1,
            new Note({ id: i + 1, text: `foo${i + 1}\nbar\nfoobar` }),
          ] as [number, Note],
        ),
      ),
      activeNoteId: 1,
    };
  }

  render() {
    return (
      <div className="home">
        <div className="home_sideMenu">
          <NoteSideMenu
            notes={this.state.notes}
            activeNoteId={this.state.activeNoteId}
            onSelectNote={id => this.changeActiveNoteId(id)}
            />
        </div>
        <div className="home_main">
          <NoteEditor
            note={this.state.notes.get(this.state.activeNoteId)!}
            onChangeNote={note => this.updateNote(note)}
            />
        </div>
      </div>
    );
  }

  changeActiveNoteId(id: number) {
    this.setState({
      activeNoteId: id,
    });
  }

  updateNote(note: Note) {
    this.setState({
      notes: this.state.notes.set(note.id, note),
    });
  }
}
