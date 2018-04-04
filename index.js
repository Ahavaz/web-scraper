const request = require('request')
const rp = require('request-promise')
const fs = require('fs')

let arr = []
let filt = []
const options = {
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
	body: '{"from":5000,"size":1000,"sort":[{"processo.distribuicaoData":"desc"},"_score"],"query":{"bool":{"must":[{"match_phrase":{"conteudo":{"query":"Acusado:","slop":"0"}}}],"filter":[]}},"highlight":{"pre_tags":["<span class=\'destaque\'>"],"post_tags":["</span>"],"fields":{"conteudo":{},"partes":{}}}}',
	json: true
}

rp(options, function (error, response, body) {
	if(error) throw new Error(error)
	// console.log(body.hits.hits)
	arr = []
	filt = []
	for(e of body.hits.hits) {
		arr.push(e._source.enderecoS3)
		// console.log(e._source.enderecoS3)
	}
	filt = arr.filter(_ => _.endsWith('.html'))
	fs.writeFileSync('links6k.json', JSON.stringify(filt))
	// console.log(JSON.stringify(arr))
	// console.log(JSON.stringify(filt))
	console.log(arr.length)
	console.log(filt.length)
})

rp({
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
	body: '{"from":6000,"size":1000,"sort":[{"processo.distribuicaoData":"desc"},"_score"],"query":{"bool":{"must":[{"match_phrase":{"conteudo":{"query":"Acusado:","slop":"0"}}}],"filter":[]}},"highlight":{"pre_tags":["<span class=\'destaque\'>"],"post_tags":["</span>"],"fields":{"conteudo":{},"partes":{}}}}',
	json: true
}, function (error, response, body) {
	if (error) throw new Error(error)
	// console.log(body.hits.hits)
	arr = []
	filt = []
	for (e of body.hits.hits) {
		arr.push(e._source.enderecoS3)
		// console.log(e._source.enderecoS3)
	}
	filt = arr.filter(_ => _.endsWith('.html'))
	fs.writeFileSync('links7k.json', JSON.stringify(filt))
	// console.log(JSON.stringify(arr))
	// console.log(JSON.stringify(filt))
	console.log(arr.length)
	console.log(filt.length)
})

rp({
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
	body: '{"from":7000,"size":1000,"sort":[{"processo.distribuicaoData":"desc"},"_score"],"query":{"bool":{"must":[{"match_phrase":{"conteudo":{"query":"Acusado:","slop":"0"}}}],"filter":[]}},"highlight":{"pre_tags":["<span class=\'destaque\'>"],"post_tags":["</span>"],"fields":{"conteudo":{},"partes":{}}}}',
	json: true
}, function (error, response, body) {
	if (error) throw new Error(error)
	// console.log(body.hits.hits)
	arr = []
	filt = []
	for (e of body.hits.hits) {
		arr.push(e._source.enderecoS3)
		// console.log(e._source.enderecoS3)
	}
	filt = arr.filter(_ => _.endsWith('.html'))
	fs.writeFileSync('links8k.json', JSON.stringify(filt))
	// console.log(JSON.stringify(arr))
	// console.log(JSON.stringify(filt))
	console.log(arr.length)
	console.log(filt.length)
})

rp({
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
	body: '{"from":8000,"size":1000,"sort":[{"processo.distribuicaoData":"desc"},"_score"],"query":{"bool":{"must":[{"match_phrase":{"conteudo":{"query":"Acusado:","slop":"0"}}}],"filter":[]}},"highlight":{"pre_tags":["<span class=\'destaque\'>"],"post_tags":["</span>"],"fields":{"conteudo":{},"partes":{}}}}',
	json: true
}, function (error, response, body) {
	if (error) throw new Error(error)
	// console.log(body.hits.hits)
	arr = []
	filt = []
	for (e of body.hits.hits) {
		arr.push(e._source.enderecoS3)
		// console.log(e._source.enderecoS3)
	}
	filt = arr.filter(_ => _.endsWith('.html'))
	fs.writeFileSync('links9k.json', JSON.stringify(filt))
	// console.log(JSON.stringify(arr))
	// console.log(JSON.stringify(filt))
	console.log(arr.length)
	console.log(filt.length)
})

rp({
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
	body: '{"from":9000,"size":230,"sort":[{"processo.distribuicaoData":"desc"},"_score"],"query":{"bool":{"must":[{"match_phrase":{"conteudo":{"query":"Acusado:","slop":"0"}}}],"filter":[]}},"highlight":{"pre_tags":["<span class=\'destaque\'>"],"post_tags":["</span>"],"fields":{"conteudo":{},"partes":{}}}}',
	json: true
}, function (error, response, body) {
	if (error) throw new Error(error)
	// console.log(body.hits.hits)
	arr = []
	filt = []
	for (e of body.hits.hits) {
		arr.push(e._source.enderecoS3)
		// console.log(e._source.enderecoS3)
	}
	filt = arr.filter(_ => _.endsWith('.html'))
	fs.writeFileSync('links9.23k.json', JSON.stringify(filt))
	// console.log(JSON.stringify(arr))
	// console.log(JSON.stringify(filt))
	console.log(arr.length)
	console.log(filt.length)
})