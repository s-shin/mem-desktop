import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { is, Map } from "immutable";
import { NoteSideMenu } from "../components/NoteSideMenu";
import { NoteEditor } from "../components/NoteEditor";
import { Note } from "../../common/entities/Note";
import { RootState } from "../reducers/index";
import { saveNote, loadNotes } from "../actions/note";
const throttle = require("lodash/throttle"); // tslint:disable-line

interface StateProps {
  notes: Map<number, Note>;
  isSaving: boolean;
}

interface DispatchProps {
  saveNote: typeof saveNote;
  loadNotes: typeof loadNotes;
}

interface Props extends StateProps, DispatchProps {
  dispatch: Dispatch<any>;
}

interface State {
  activeNote?: Note;
  isEditing: boolean;
}

class Component extends React.Component<Props, State> {
  private saveActiveNoteWithThrottle: any;

  constructor(props: Props) {
    super(props);

    this.saveActiveNoteWithThrottle = throttle(() => {
      if (this.state.activeNote !== undefined) {
        this.props.saveNote(this.state.activeNote);
      }
    }, 2000, { leading: false });

    this.state = {
      activeNote: props.notes.first(),
      isEditing: false,
    };
  }

  componentWillMount() {
    this.props.loadNotes();
  }

  componentWillReceiveProps(newProps: Props) {
    const { activeNote } = this.state;
    if (activeNote !== undefined) {
      this.setState({
        isEditing: !is(activeNote, newProps.notes.get(activeNote.id)),
      });
    }
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
            isSaving={this.props.isSaving}
            isEditing={this.state.isEditing}
            />
        </div>
      </div>
    );
  }

  changeActiveNoteId(id: number) {
    this.saveActiveNoteWithThrottle.flush();
    this.setState({
      activeNote: this.props.notes.get(id),
      isEditing: false,
    });
  }

  updateNote(note: Note) {
    this.setState({ activeNote: note, isEditing: true });
    this.saveActiveNoteWithThrottle();
  }
}

export const Home = connect<StateProps, DispatchProps, {}, RootState>(
  state => ({
    notes: state.notes.notes,
    isSaving: state.notes.isSaving,
  }),
  { saveNote, loadNotes },
)(Component);
