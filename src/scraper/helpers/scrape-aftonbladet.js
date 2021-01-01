import chalk from 'chalk'
import fs from 'fs'
import scrapeIt from 'scrape-it'
import path from 'path'
import _ from 'lodash'

const sites = ['https://aftonbladet.se', 'https://aftonbladet.se/nojesbladet']

const scrapeAftonbladet = () => {
	for (let site of sites) {
		scrapeIt(site, {
			articles: {
				listItem: '.HLf1C',
				data: {
					title: 'h3',
					url: {
						selector: 'a',
						attr: 'href',
					},
				},
			},
		}).then(({ data, response }) => {
			let file = path.join(__dirname, '../../data/aftonbladet.json')
			fs.writeFile(file, JSON.stringify(data), function (err) {
				if (err) {
					return console.log(err)
				}
			})
		})
	}
}

export default scrapeAftonbladet
