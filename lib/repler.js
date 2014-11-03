var readline = require('readline')
  , util = require('util')
  , stream = require('stream')
  , fs = require('fs')
  , _ = require('lodash')
  , parse = require('./parse')

var Input = function(options){
	stream.Readable.call(this, options)
};
util.inherits(Input, stream.Readable)
Input.prototype._read = function(){}

var defaults = {
	'input': process.stdin,
	'output': process.stdout,
	'terminal': true
}

// application
module.exports = exports = function(options, callback){
	if (!callback) {
		callback = options
		options = {}
	}
	options = _.defaults(options, defaults)

	var mode = 'init'
	  , lines = []
	  , delimiter
	  , input
	  , output;

	var prompt = function(){
		if (mode === 'heredoc') throw new Error('Heredoc is not ending yet')
		lines = []
		input = null
		output = null
		mode = 'prompt'
		rl.prompt()
	}

	// define readline
	var rl = readline.createInterface(options)
	rl.on('line', function(line){
		switch (mode) {
		case 'prompt':
			// when command is ongoing
			if (/\\$/.test(line)) {
				lines.push(line.replace(/\\$/, ''))
				return
			}
			lines.push(line)
			var args = parse(lines.join(' ')).reduceRight(function(result, arg, i, args){
				// heredoc
				var match = /^<<(\w+)$/.exec(arg)
				if (match !== null) {
					if (input) return result
					mode = 'heredoc'
					delimiter = match[1]
					input = new Input()
					return result
				}
				if (arg === '<' || arg === '>' || arg === '>>') {
					return result
				}

				var next = args[i + 1]
				if (next === '<') {
					if (input) return result
					input = fs.createReadStream(arg)
				}
				else if (next === '>') {
					if (output) return result
					output = fs.createWriteStream(arg)
				}
				else if (next === '>>') {
					if (output) return result
					output = fs.createWriteStream(arg)
				}
				else result.unshift(arg)
				return result
			}, [])
			callback(args, prompt, input, output)
			break;
			;;
		case 'heredoc':
			// when heredoc ends
			if (line === delimiter) {
				input.push(null)
				mode = 'heredoc done'
			}
			else {
				input.push(line)
			}
			;;
		}
	})
	rl.on('close', function(){

	})
	rl.on('SIGINT', function(){
		process.exit(1)
	})
	prompt()
	return this
}
