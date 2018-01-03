import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Map } from "immutable";
import { NoteSideMenu } from "../components/NoteSideMenu";
import { NoteEditor } from "../components/NoteEditor";
import { Note } from "../../common/entities/Note";
import { RootState } from "../reducers/index";
import { saveNote } from "../actions/note";

interface StateProps {
  notes: Map<number, Note>;
}

interface DispatchProps {
  saveNote: typeof saveNote;
}

interface Props extends StateProps, DispatchProps {
  dispatch: Dispatch;
}

interface State {
  activeNote?: Note;
}

class Component extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeNote: props.notes.first(),
    };
  }

  render() {
    const { activeNote } = this.state;
    return (
      <div className="home">
        <div className="home_sideMenu">
          <NoteSideMenu
            notes={this.props.notes}
            activeNoteId={activeNote ? activeNote.id : 0}
            onSelectNote={id => this.changeActiveNoteId(id)}
            />
        </div>
        <div className="home_main">
          <NoteEditor
            note={activeNote}
            onChangeNote={note => this.updateNote(note)}
            />
        </div>
      </div>
    );
  }

  changeActiveNoteId(id: number) {
    this.setState({
      activeNote: this.props.notes.get(id),
    });
  }

  updateNote(note: Note) {
    this.setState({ activeNote: note });
    this.props.saveNote(note);
  }
}

export const Home = connect<StateProps, DispatchProps, {}, RootState>(
  state => ({
    notes: state.notes.notes,
  }),
  { saveNote },
)(Component);
