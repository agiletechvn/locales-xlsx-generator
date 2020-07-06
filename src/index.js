const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('src/locales/id-portal.xlsx', {
  type: 'file',
  bookType: 'xlsx',
  raw: true,
});

const languageSheet = workbook.Sheets[workbook.SheetNames[0]];

const languageSheetData = XLSX.utils.sheet_to_json(languageSheet);

const languages = ['vi-VN', 'en-US', 'de'];
const transObject = {};

languages.map(e => (transObject[e] = {}));

languageSheetData.map(e => {
  languages.map(lang => {
    const key = decodeURIComponent(e.key.replace('\u001d', ''));
    const tran = decodeURIComponent(e[lang].replace('\u001d', ''));
    transObject[lang][key] = tran;
  });
});

languages.map(e => {
  fs.writeFileSync(`src/locales/translations/${e}.json`, JSON.stringify(transObject[e]), 'utf8');
});
