import React from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { NoteSideMenu } from "../components/NoteSideMenu";
import { NoteEditor } from "../components/NoteEditor";
import { Note } from "../../common/entities/Note";
import { AppState } from "../AppState";
import { updateNote } from "../actions/note";

interface StateProps {
  notes: Map<number, Note>;
}

interface DispatchProps {
  updateNote: typeof updateNote;
}

interface Props extends StateProps, DispatchProps {}

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

  componentWillReceiveProps(props: Props) {
    const { activeNote } = this.state;
    this.setState({
      activeNote: activeNote !== undefined
        ? props.notes.get(activeNote.id)
        : props.notes.first(),
    });
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
    // TODO: lock editor then save
    // this.props.updateNote(note);
  }
}

export const Home = connect<StateProps, DispatchProps, {}, AppState>(
  state => ({
    notes: state.notes.notes,
  }),
  { updateNote },
)(Component);
