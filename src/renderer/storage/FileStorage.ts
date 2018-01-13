import * as fs from "fs";
import * as path from "path";
import mkdirp from "mkdirp";
import { promisify } from "../../common/util/promise";
import { remote } from "electron";

import { Note, NoteId } from "../../common/entities/Note";

const DEFAULT_MEM_DIR = path.join(remote.app.getPath("home"), ".mem");

interface Storage {
  saveNote(note: Note): Promise<void>;
  getNoteIds(): Promise<NoteId[]>;
  loadNote(id: NoteId): Promise<Note>;
}

export class FileStorage implements Storage {
  constructor(
    readonly memDir = DEFAULT_MEM_DIR,
  ) {}

  getMemDocRoot() {
    return path.join(this.memDir, "docroot");
  }

  getMemDocPath(fileName: string) {
    return path.join(this.getMemDocRoot(), fileName);
  }

  async initMemDir() {
    await promisify(mkdirp)(this.getMemDocRoot(), null);
  }

  async saveNote(note: Note) {
    await this.initMemDir();
    const fd = await promisify(fs.open)(this.getMemDocPath(`${note.id}.md`), "w");
    await promisify(fs.write)(fd, note.text);
  }

  async getNoteIds() {
    const files: string[] = await promisify(fs.readdir)(this.getMemDocRoot());
    return files.map(f => Number(f.split(".")[0]));
  }

  async loadNote(id: NoteId) {
    const text = await promisify<string, string, string>(fs.readFile)(this.getMemDocPath(`${id}.md`), "utf8");
    return new Note({ id, text });
  }
}
