const request = require('request')
const fs = require('fs')

const search = 'Acusado:'
const size = 1000
let params = []
let arr = []
// let filt = []
let c = 1

function options(start, size, search) {
	return {
		method: 'POST',
		url: 'https://esovh3.digesto.com.br/processo_anexo_181/_search',
		headers: {
			'Postman-Token': '6a1cbc5a-40e7-4401-b5b7-0dfc8a18da48',
			'Cache-Control': 'no-cache',
			Host: 'esovh3.digesto.com.br',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6',
			Accept: 'text/plain, */*; q=0.01'
		},
		body: `{"from":${start},"size":${size},"sort":[{"processo.distribuicaoData":"desc"},"_score"],"query":{"bool":{"must":[{"match_phrase":{"conteudo":{"query":"${search}","slop":"0"}}}],"filter":[]}},"highlight":{"pre_tags":["<span class=\'destaque\'>"],"post_tags":["</span>"],"fields":{"conteudo":{},"partes":{}}}}`,
		json: true
	}
}

function createParts(total, size) {
	const rest = total % size 
	const limit = (total - rest) / size
	let i = 0
	while(i < limit)
		params.push({ start: i++ * size, size: size })
	if(rest)
		params.push({ start: i * size, size: rest })
	return params
}

function getTotal(search) {
	request(options(0, 10, search), function (error, response, body) {
		if(error) throw new Error(error)
		total = body.hits.total
		return total
	})
}

let total = getTotal(search)

setTimeout(function () {
	console.log(total)
	params = createParts(total, size)
	console.log(params)
	
	for([i, obj] of params.entries()) {
		let object = obj
		let index = i
		getData(object, index)
		// console.log(object.start, object.size)
	}
}, 3000)

function getData(object, index) {
	setTimeout(function () {
		request(options(object.start, object.size, search), function (error, response, body) {
			if(error) throw new Error(error)
			// console.log(body.hits.hits)
			for(e of body.hits.hits) {
				arr.push(e._source.enderecoS3)
				console.log(e._source.enderecoS3)
			}
			if(c++ === params.length) {
				// filt = arr.filter(_ => _.endsWith('.html'))
				fs.writeFileSync(`./files/links.json`, JSON.stringify(arr))
				// console.log(result)
				console.log(arr.length)
				console.log(`\nDone!`)
			}
			// fs.writeFileSync(`./files/links${index + 1}-${start + size}.json`, JSON.stringify(filt))
			// console.log(JSON.stringify(arr))
			// console.log(JSON.stringify(filt))
			console.log(arr.length)
		})
	}, 500 * index)
}