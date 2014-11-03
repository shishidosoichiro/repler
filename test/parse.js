require("chai").should();
var expect = require("chai").expect;

var parse = require("../lib/parse");

describe("parse", function(){

	"use strict";

	it("should parse a string with delimiter a space \' \'", function(){
		var args = parse("shishido soichiro");
		args.should.have.length(2);
		args[0].should.equal("shishido");
		args[1].should.equal("soichiro");
		expect(args[2]).to.be.undefined;
	});

	it("should let tab character be a kind of space", function(){
		var args = parse("shishido soichiro	is japanese");
		args.should.have.length(4);
		args[0].should.equal("shishido");
		args[1].should.equal("soichiro");
		args[2].should.equal("is");
		args[3].should.equal("japanese");
		expect(args[4]).to.be.undefined;
	});

	it("should let more than two space ' ' be one delimiter", function(){
		var args = parse("shishido    soichiro 	 is  japanese");
		args.should.have.length(4);
		args[0].should.equal("shishido");
		args[1].should.equal("soichiro");
		args[2].should.equal("is");
		args[3].should.equal("japanese");
		expect(args[4]).to.be.undefined;
	});

	it("should trim", function(){
		var args = parse("   john lennon   ");
		args.should.have.length(2);
		args[0].should.equal("john");
		args[1].should.equal("lennon");
		expect(args[2]).to.be.undefined;
	});

	it("should let a sub string quoted by quotation '\"' be one argument.",
		function(){
		var args = parse("\"shishido soichiro\" is japanese");
		args.should.have.length(3);
		args[0].should.equal("shishido soichiro");
		args[1].should.equal("is");
		args[2].should.equal("japanese");
		expect(args[3]).to.be.undefined;
	});

	it("should let a sub string quoted by quotation '\'' be one argument.", function(){
		var args = parse('\'shishido soichiro\' is japanese');
		args.should.have.length(3);
		args[0].should.equal("shishido soichiro");
		args[1].should.equal("is");
		args[2].should.equal("japanese");
		expect(args[3]).to.be.undefined;
	});

	it("should let two quotation characters '\"\"' in a sub string quoted by" + 
		" quotation '\"' be not a sign which ends a quotation but just one character '\"'.", function(){
		var args = parse('"shishido ""megane"" soichiro" is japanese');
		args.should.have.length(3);
		args[0].should.equal('shishido "megane" soichiro');
		args[1].should.equal("is");
		args[2].should.equal("japanese");
		expect(args[3]).to.be.undefined;
	});
	
	it("should let two quotation characters '\'\'' in a sub string quoted by quotation '\'' be not a sign which ends a quotation but just one character '\''.", function(){
		var args = parse("'shishido ''megane'' soichiro' is japanese");
		args.should.have.length(3);
		args[0].should.equal("shishido 'megane' soichiro");
		args[1].should.equal("is");
		args[2].should.equal("japanese");
		expect(args[3]).to.be.undefined;
	});
});