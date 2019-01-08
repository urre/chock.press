import chalk from 'chalk'
import fs from 'fs'
import scrapeIt from 'scrape-it'
import path from 'path'
import _ from 'lodash'

const sites = [
	'http://www.aftonbladet.se',
	'http://www.aftonbladet.se/nojesbladet'
]

const scrapeAftonbladet = () => {
	for (let site of sites) {
		console.log(site)
		scrapeIt(site, {
			articles: {
				listItem: site.includes('nojesbladet') ? 'div' : 'div',
				data: {
					title: site.includes('nojesbladet') ? 'h3' : 'h3',
					url: {
						selector: 'a',
						attr: 'href'
					}
				}
			}
		}).then(({ data, response }) => {
			let file = path.join(__dirname, '../../data/aftonbladet.json')
			console.log(data)
			console.log(response)
			fs.writeFile(file, JSON.stringify(data), function(err) {
				if (err) {
					return console.log(err)
				}
			})
		})
	}
}

export default scrapeAftonbladet
