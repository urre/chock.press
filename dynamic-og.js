const fs = require('fs')
const insertLine = require('insert-line')
const chalk = require('chalk')
const log = console.log

const htmlFile = `./build/index.html`

const getStats = () => {
	let afData = fs.readFileSync('./build/data/af.json')
	let afStats = JSON.parse(afData).length
	let exData = fs.readFileSync('./build/data/ex.json')
	return `${JSON.parse(exData).length}-${JSON.parse(afData).length}`
}

const removeLines = (data, lines = []) => {
	return data
		.split('\n')
		.filter((val, idx) => lines.indexOf(idx) === -1)
		.join('\n')
}

const insertLines = () => {
	const score = getStats()
	const ogImage = `https://res.cloudinary.com/urre/image/upload/b_red,co_white,l_text:Arial_148_bold:%20${score}%20,g_south_east,y_50/v1609240655/chockpress-og_ejo8kf.jpg`
	const OpenGraphImageTag = `\t<meta name="og:image" content="${ogImage}">\n`
	const TwitterCardImageTag = `\t<meta name="twitter:image" content="${ogImage}">`

	log(`${chalk.green(`✅ Fetched stats : ${score}`)}`)

	insertLine(`${htmlFile}`)
		.content(`${OpenGraphImageTag}${TwitterCardImageTag}`)
		.at(22)
		.then(function (err) {
			log(
				`${chalk.green(
					`✅ Inserted Facebook Open Graph and Twitter Card tags in index.html`
				)}`
			)
		})
}

fs.readFile(htmlFile, 'utf8', (err, data) => {
	if (err) throw err

	fs.writeFile(htmlFile, removeLines(data, [21, 22]), 'utf8', function (err) {
		if (err) throw err
		log(`${chalk.green(`✅ Removed previous meta tag lines in the html file`)}`)
		insertLines()
	})
})
