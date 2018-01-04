import * as fs from "fs";
import { promisify } from "../common/util";
import { remote } from "electron";

const sandbox = async () => {
  const readdir = promisify(fs.readdir);
  const files = await readdir(remote.app.getPath("home"));
  console.log(files);
};

sandbox();
