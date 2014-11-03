require("chai").should();
var expect = require("chai").expect;

var repler = require("../lib/repler")
  , stream = require("stream")
  , util = require("util")

var Input = function(options){
	stream.Readable.call(this, options)
};
util.inherits(Input, stream.Readable)
Input.prototype._read = function(){}

var Output = function(options){
	stream.Writable.call(this, options)
};
util.inherits(Output, stream.Writable)
Output.prototype._write = function(){}

describe("repler", function(){

	"use strict";

	it("should receive input as array", function(done){
		var input = new Input()
		  , output = new Output()

		repler({input:input, output:output}, function(args, prompt, input, output){
			args.should.have.length.of(1)
			args[0].should.equal("hello")
			done()
		})
		input.push("hello\r\n")
		input.push(null)
	});

	it("should receive input as parsed strings", function(done){
		var input = new Input()
		  , output = new Output()

		repler({input:input, output:output}, function(args, prompt, input, output){
			args.should.have.length.of(2)
			args[0].should.equal("hello")
			args[1].should.equal("world")
			done()
		})
		input.push("hello world\r\n")
		input.push(null)
	});

	it("should receive input as parsed strings", function(done){
		var input = new Input()
		  , output = new Output()

		repler({input:input, output:output}, function(args, prompt, input, output){
			args.should.have.length.of(2)
			args[0].should.equal("hello")
			args[1].should.equal("shishido soichiro")
			done()
		})
		input.push("hello 'shishido soichiro'\r\n")
		input.push(null)
	});

	it("should receive input as parsed strings", function(done){
		var input = new Input()
		  , output = new Output()

		repler({input:input, output:output}, function(args, prompt, input, output){
			var lines = []
			input.on("data", function(chunk){
				lines.push(chunk.toString())
			})
			input.on("end", function(){
				lines.should.have.length.of(5)
				lines[0].should.equal("this is heredoc")
				lines[1].should.equal("2")
				lines[2].should.equal("3")
				lines[3].should.equal("4")
				lines[4].should.equal("heredoc ending")
				done()
			})
			args.should.have.length.of(2)
			args[0].should.equal("grep")
			args[1].should.equal("error")
		})
		input.push("grep error <<EOF\r\n")
		input.push("this is heredoc\r\n")
		input.push("2\r\n3\r\n")
		input.push("4\r\n")
		input.push("heredoc ending\r\n")
		input.push("EOF\r\n")
		input.push(null)
	});

});