import * as fs from 'fs';

export default class FileWriter {
  private file_path: string;
  constructor(file_path: string) {
    this.file_path = file_path;
    fs.writeFileSync(this.file_path, "");
  }
  append(text: string) {
    fs.appendFileSync(this.file_path, `${text}`);
  }
}