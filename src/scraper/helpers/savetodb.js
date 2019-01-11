import GoogleSpreadsheet from 'google-spreadsheet'
import async from 'async'
import fs from 'fs'
import ab from './../../data/af.json'
import ex from './../../data/ex.json'

require('dotenv').config()

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID)

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
			function(err, rows) {
				console.log(err)
			}
		)
	}
}

async.series([
	function setAuth(step) {
		var creds_json = {
			client_email: process.env.GOOGLE_CLIENT_EMAIL,
			private_key: process.env.GOOGLE_PRIVATE_KEY
		}

		doc.useServiceAccountAuth(creds_json, step)
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
