//copyFileTest.js

var assert = require("chai").assert; 
var expect = require('chai').expect;
//var should = require('chai').should();
var sinon = require("sinon");
//var fs = require("fs");

var cp = require("./copyFile");


describe('copyFile', function() {

	it("promise should resoved with 'true'", function() {
		var src = "copyFileTest.js"
			,dest = "copyFileTest.js.copy";
		var result = cp.copyFileAsync(src, dest);

		result.then(function(status) {
			expect(status).to.equal(true);
		});
	});

	it.skip("promise should rejected with error", function() {
		var src = "a.txt"
			,dest = "a.txt.copy";
		var result = cp.copyFileAsync(src, dest);

		result.then(function(status) {
			expect(status).to.equal(true);
			done();
		}, function(error){
			assert.fail(error);
			done();
		});
	});	

});