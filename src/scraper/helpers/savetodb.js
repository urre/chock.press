import async from 'async'
import ab from './../../data/af.json'
import ex from './../../data/ex.json'

var fs = require('fs')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [] }).write()

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
	function backupExpressen(step) {
		send(ex, 'Expressen')
		step()
	},
	function backupAftonbladet(step) {
		send(ab, 'Aftonbladet')
	}
])
