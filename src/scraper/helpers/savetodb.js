// import GoogleSpreadsheet from 'google-spreadsheet'
import async from 'async'
import ab from './../../data/af.json'
import ex from './../../data/ex.json'

var fs = require('fs')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [] }).write()

// const doc = new GoogleSpreadsheet(
// 	'1uniZbthuqrdPDLfa-GjVNxi8Y6OVXEcbfValKPuaeuw'
// )

var sheet

const send = (data, source) => {
	for (const key of Object.keys(data)) {
		db.get('posts')
			.push({
				title: data[key].title.trim(),
				source: source,
				url: data[key]['url']
			})
			.write()
	}
}

async.series([
	// function setAuth(step) {
	// 	const creds = require('./credentials.json')
	// 	doc.useServiceAccountAuth(creds, step)
	// },
	// function listRows(step) {
	// 	doc.getInfo(function(err, info) {
	// 		console.log('Loaded doc: ' + info.title + ' by ' + info.author.email)
	// 		sheet = info.worksheets[0]
	// 		console.log(
	// 			'sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount
	// 		)
	// 		step()
	// 	})
	// },
	function backupExpressen(step) {
		send(ex, 'Expressen')
		step()
	},
	function backupAftonbladet(step) {
		send(ab, 'Aftonbladet')
	}

	// function workingWithRows(step) {
	// 	sheet.getRows(
	// 		{
	// 			offset: 1,
	// 			limit: 5000,
	// 			orderby: 'col1'
	// 		},
	// 		function(err, rows) {
	// 			for (var key in rows) {
	// 				db.get('posts')
	// 					.push({
	// 						title: rows[key]['heading'],
	// 						source: rows[key]['source'],
	// 						url: rows[key]['url']
	// 					})
	// 					.write()
	// 			}
	// 		}
	// 	)
	// }
])
