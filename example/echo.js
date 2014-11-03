var repler = require("../index.js")

repler(function(args, done, input, output){
	console.log(JSON.stringify(args, null, '  '))
	done()
})
