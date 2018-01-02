import { Record } from "immutable";

export type NoteId = number;

const DEFAULT_PROPS = {
  id: 0,
  text: "",
};

export class Note extends Record(DEFAULT_PROPS) {
  getTitle() {
    return this.text.split("\n")[0].trim();
  }

  hasTitle() {
    return this.getTitle().length > 0;
  }

  getDescription() {
    return this.text.split("\n").slice(1).join(" ").slice(0, 20).trim();
  }

  hasDescription() {
    return this.getDescription().length > 0;
  }
}
