import chalk from 'chalk'
import fs from 'fs'
import scrapeIt from 'scrape-it'
import path from 'path'
import _ from 'lodash'

const sites = ['http://www.expressen.se']

const scrapeExpressen = () => {
	for (let site of sites) {
		scrapeIt(site, {
			articles: {
				listItem: '.teaser',
				data: {
					title: 'h2',
					url: {
						selector: 'a.row',
						attr: 'href'
					}
				}
			}
		}).then(({ data, response }) => {
			let file = path.join(__dirname, '../../data/expressen.json')
			fs.writeFileSync(file, JSON.stringify(data), function(err) {
				if (err) {
					return console.log(err)
				}
			})
		})
	}
}

export default scrapeExpressen
