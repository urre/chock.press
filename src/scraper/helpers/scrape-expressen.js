import chalk from 'chalk'
import fs from 'fs'
let Parser = require('rss-parser')
let parser = new Parser()
import path from 'path'
import _ from 'lodash'

const scrapeExpressen = async () => {
	let feed = await parser.parseURL('https://feeds.expressen.se/kvp/')

	let articleObject = {
		articles: [],
	}

	feed.items.forEach((item) => {
		articleObject.articles.push({ title: item.title, url: item.link })
	})

	let file = path.join(__dirname, '../../data/expressen.json')

	fs.writeFileSync(file, JSON.stringify(articleObject), function (err) {
		if (err) {
			return console.log(err)
		}
	})
}

export default scrapeExpressen
