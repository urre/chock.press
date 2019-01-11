import GoogleSpreadsheet from 'google-spreadsheet'
import async from 'async'
import fs from 'fs'
import ab from './../../data/af.json'
import ex from './../../data/ex.json'

const doc = new GoogleSpreadsheet(
	'1uniZbthuqrdPDLfa-GjVNxi8Y6OVXEcbfValKPuaeuw'
)

let sheet

const send = (data, source) => {
	for (const key of Object.keys(data)) {
		doc.addRow(
			1,
			{
				heading: data[key].title.trim(),
				source: source,
				url: data[key]['url']
			},
			function(err, rows) {}
		)
	}
}

async.series([
	function setAuth(step) {
		const creds = require('./credentials.json')
		doc.useServiceAccountAuth(creds, step)
	},
	function listRows(step) {
		doc.getInfo(function(err, info) {
			console.log('Loaded doc: ' + info.title + ' by ' + info.author.email)
			sheet = info.worksheets[0]
			console.log(
				'sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount
			)
			step()
		})
	},
	function backupExpressen(step) {
		send(ex, 'Expressen')
		step()
	},
	function backupAftonbladet(step) {
		send(ab, 'Aftonbladet')
	}
])
