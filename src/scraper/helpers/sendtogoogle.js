const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');

// https://docs.google.com/spreadsheets/d/1DfcW1M4D4qyJr7WZw13AACeXaE-wCyus6cnC1I5SSZM/edit#gid=0

var doc = new GoogleSpreadsheet('1DfcW1M4D4qyJr7WZw13AACeXaE-wCyus6cnC1I5SSZM');
var sheet;

var newrow = {
  title: 'test'
};

async.series([function setAuth(step) {
  var creds = require('./credentials.json');
  doc.useServiceAccountAuth(creds, step);
}, function getInfoAndWorksheets(step) {
  doc.getInfo(function(err, info) {
    console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
    sheet = info.worksheets[0];
    console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
    step();
  });
}, function addStuff(step) {

  // Add data
  doc.addRow(1, newrow, function(err, rows) {
    console.log(rows);
    step();
  });
}, function getStuff(step) {
  sheet.getRows({
    offset: 1,
    limit: 20,
    orderby: 'col1'
  }, function(err, rows) {
    console.log('Read ' + rows.length + ' rows');

    for (var i = 0; i < rows.length; ++i) {
      console.log(rows[i].title);
    }

    step();

  });
}

]);