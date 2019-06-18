export class PDFParser {
  private parts = [];
  fromFile(file: string) {
    let lines = file.split('\n');

    let part = [];

    lines.forEach(line => {
      // #region capture generic obj
      if (/^([0-9]{1,6}) ([0-9]{1,6}) obj/.test(line)) {
        part.push(line);
        return;
      }

      if (/^endobj/.test(line)) {
        part.push(line);

        this.parts.push(part);
        part = [];

        return;
      }
      // #endregion

      // #region capture xref and trailer
      if (/^xref/.test(line)) {
        part.push(line);
        return;
      }
      if (/^trailer/.test(line) && part.length) {
        this.parts.push(part);
        part = [];
        part.push(line);

        return;
      }
      if (/^%%EOF/.test(line)) {
        this.parts.push(part);
        return;
      }
      // #endregion

      // #region capture anything between

      if (part.length) {
        part.push(line);

        return;
      }

      console.log('we shoudnt hit this:');
      console.log(line);

      // #endregion
    });
  }

  log() {
    console.log(this.parts);
  }
}
