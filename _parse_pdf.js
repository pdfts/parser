const pdf = require('../dist/pdf');
const parser = new pdf.PDFParser();
const fs = require('fs');

const file = fs.readFileSync(__dirname + '/_parse_pdf_example.pdf', 'utf8');
parser.fromFile(file);

//parser.log();
