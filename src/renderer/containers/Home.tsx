import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { is, Map } from "immutable";
import { NoteSideMenu } from "../components/NoteSideMenu";
import { NoteEditor } from "../components/NoteEditor";
import { Note } from "../../common/entities/Note";
import { RootState } from "../reducers/index";
import { saveNote, loadNotes } from "../actions/note";
import { Cancelable } from "lodash";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

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
  private saveActiveNoteWithThrottle: (() => void) & Cancelable;
  private checkEditStateWithDebouncing: (() => void) & Cancelable;

  constructor(props: Props) {
    super(props);

    this.saveActiveNoteWithThrottle = throttle(() => {
      if (this.isActiveNoteEdited()) {
        this.props.saveNote(this.state.activeNote!);
      }
    }, 2000, { leading: false });

    this.checkEditStateWithDebouncing = debounce(() => {
      const isEditing = this.isActiveNoteEdited();
      if (isEditing) {
        this.saveActiveNoteWithThrottle();
      } else if (this.state.isEditing) {
        this.saveActiveNoteWithThrottle.cancel();
      }
      this.setState({ isEditing });
    }, 100, { leading: false });

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
    this.checkEditStateWithDebouncing.flush();
    this.saveActiveNoteWithThrottle.flush();
    this.setState({
      activeNote: this.props.notes.get(id),
      isEditing: false,
    });
  }

  updateNote(note: Note) {
    this.setState({ activeNote: note });
    this.checkEditStateWithDebouncing();
  }

  isActiveNoteEdited() {
    const note = this.state.activeNote;
    return note !== undefined && !is(note, this.props.notes.get(note.id));
  }
}

export const Home = connect<StateProps, DispatchProps, {}, RootState>(
  state => ({
    notes: state.notes.notes,
    isSaving: state.notes.isSaving,
  }),
  { saveNote, loadNotes },
)(Component);
