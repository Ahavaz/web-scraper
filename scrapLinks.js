const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const path = 'C:\\Users\\lucas\\git-repos\\web-scraper\\'
const filesArr = [
	// `${path}links1k.json`,
	// `${path}links2k.json`,
	// `${path}links3k.json`,
	// `${path}links4k.json`,
	// `${path}links5k.json`,
	// `${path}links6k.json`,
	// `${path}links7k.json`,
	// `${path}links8k.json`,
	// `${path}links9k.json`,
	`${path}links9.23k.json`
]
const jsonArr = [].concat(...filesArr.map(_ => require(_)))
let result = []
let log = []
let c = 1
let $ = {}
let status = ''

console.log(`Status\tID\tTotal\tURL`)

for([i, url] of jsonArr.entries()) {
	let link = url
	let index = i
	getData(link, index)
}

function getData(link, index) {
	setTimeout(function() {
		request({ url: link, encoding: 'binary'}, function(error, response, body) {
			if (error) throw new Error(error)
			$ = cheerio.load(body)
			$('span.nome_parte').each(function (e, i) {
				tipo = $(i).parent().children('span.tipo_parte').text()
				nome = $(i).parent().children('span.nome_parte').text()
				result.push({ tipo: tipo, nome: nome, url: response.request.uri.href })
			})
			$('span.nome_parte_representante').each(function (e, i) {
				tipo = $(i).parent().children('span.tipo_parte_representante').text()
				nome = $(i).parent().children('span.nome_parte_representante').text()
				result.push({ Tipo: tipo, Nome: nome, URL: response.request.uri.href })
			})
			status = `${(c*100/jsonArr.length).toFixed(0)}%`
			console.log(`${status}\t${c}\t${result.length}\t${link}`)
			log.push({ Status: status, ID: c, Total: result.length, URL: link })
			if (c++ === jsonArr.length) {
				fs.writeFileSync('result.json', JSON.stringify(result))
				fs.writeFileSync('log.json', JSON.stringify(log))
				console.log('\nDone!')
			}
		})
	}, 1500 * index)
}