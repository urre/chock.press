'use strict'

const Twit = require('twit')
const TwitterBot = require('node-twitterbot').TwitterBot
const fetch = require('node-fetch')

require('dotenv').config()

const Bot = new TwitterBot({
	consumer_key: process.env.BOT_CONSUMER_KEY,
	consumer_secret: process.env.BOT_CONSUMER_SECRET,
	access_token: process.env.BOT_ACCESS_TOKEN,
	access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
})

const baseURL = `https://chockpress.urre.vercel.app/data/`
const sources = ['ex', 'af']
const source = sources[Math.floor(Math.random() * sources.length)]

async function fetchData() {
	// Random chocking headline
	let headings = await fetch(`${baseURL}${source}.json`)
	let headingsData = await headings.json()
	const headingRandom =
		headingsData[Math.floor(Math.random() * headingsData.length)]

	// Expressen count
	let expressenResponse = await fetch(`${baseURL}${sources[0]}.json`)
	let expressenData = await expressenResponse.json()
	const expressenCount = expressenData.length

	// Aftonbladet count
	let aftonbladetResponse = await fetch(`${baseURL}${sources[1]}.json`)
	let aftonbladetData = await aftonbladetResponse.json()
	const aftonbladetCount = aftonbladetData.length

	return [headingRandom, expressenCount, aftonbladetCount]
}

fetchData()
	.then((data) =>
		Bot.tweet(`
		${data[0].title}\n
		📈 ${data[2]}-${data[1]} ↓
		https://chockpress.urre.vercel.app
	`)
	)
	.catch((reason) => console.log(reason.message))
