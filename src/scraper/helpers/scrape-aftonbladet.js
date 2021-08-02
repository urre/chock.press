import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
let Parser = require('rss-parser')
let parser = new Parser()

const scrapeAftonbladet = async () => {
	let feed = await parser.parseURL(
		'https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/'
	)

	let articleObject = {
		articles: [],
	}

	feed.items.forEach((item) => {
		articleObject.articles.push({ title: item.title, url: item.link })
	})

	let file = path.join(__dirname, '../../data/aftonbladet.json')

	fs.writeFile(file, JSON.stringify(articleObject), function (err) {
		if (err) {
			return console.log(err)
		}
	})
}

export default scrapeAftonbladet
