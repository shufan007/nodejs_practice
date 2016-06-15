//mocha_basic.js


"use strict";
var assert = require("assert");


describe('mocha_basic', function(){

	describe('Array', function(){
		var arr = [1,2,3];
		describe('#indexOf()', function(){

	  		it('should return 1 ', function(){
			    assert.equal(1, arr.indexOf(2));
			});	

	  		it('should return -1 when the value is not present', function(){
	        	assert.equal(-1, arr.indexOf(5));
			});
		});

		describe('#valueOf()', function(){

	  		it('should return 1 ', function(){
	  			arr.push(4);
			    assert.deepEqual([1,2,3,4], arr);
			});
		});		
	});	

	//Async
	describe('File', function(){
		describe('#readFile()', function(){

			var	fs = require('fs');

			beforeEach(function(done) {
				done();
			});
			afterEach(function(done) {
				done();
			});

	    	it('should read mocha_basic.js without error', function(done){
		    	fs.readFile('mocha_basic.js', function(err){
					if (err) throw err;
					done();
				});		
			});

	    	it('should read test.ls with error', function(done){
		    	fs.readFile('test.ls', function(err){
					if (err) throw err;
					done();
				});	
			});		
		})
	});	

	describe('Hello', function(){
		var Hello = require('./Hello');
		var hello = new Hello;

		beforeEach(function(done) {
			//console.log('beforeEach called')
			done();
		});
		afterEach(function(done) {
			//console.log('afterEach called')
			done();
		});

		it.skip("obj.m_name should be 'javascript'", function(done){
			hello.m_name = "javascript";
			assert.equal("javascript", hello.m_name);
			done();	
		});

		it("obj.m_name should be 'mocha'", function(done){
			hello.setName("mocha");
			assert.equal("mocha", hello.m_name);
			done();	
		});

		it("obj.sayHello() should return 'Hello mocha'", function(done){
			hello.setName("mocha");
			assert.equal("Hello mocha", hello.sayHello());
			done();	
		});

		context("group 1", function () {
			beforeEach(function () {
			});
			afterEach(function () {
			});

			it('(- group -)test case 1', function() {
			});
		});	
	});

	//dynamically generating tests
	describe('dynamically generating tests', function() {

		function add() {
		  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
		    return prev + curr;
		  }, 0);
		}	
			
		describe('add()', function() {
			var tests = [
				{args: [1, 2],       expected: 3},
				{args: [1, 2, 3],    expected: 6},
				{args: [1, 2, 3, 4], expected: 10}
			];

			tests.forEach(function(test) {
				it('correctly adds ' + test.args.length + ' args', function() {
					var res = add.apply(null, test.args);
					assert.equal(res, test.expected);
				});
			});

		});

	});	

	//slow tests
	describe('slow tests test group', function() {

		it('test case 1', function(done) {
			setTimeout(done, 10);
		});

		it('test case 2', function(done) {
			setTimeout(done, 50);
		});

		it('test case 3', function(done) {
			setTimeout(done, 100);
		});
	});

	// timeouts	
	describe.only('time outs test group', function() {
		this.timeout(100);
		it('test case 1', function(done) {
			setTimeout(done, 50);
		});

		it.skip('test case 2', function(done) {
			setTimeout(done, 90);
		});

		it('test case 3', function(done) {
			setTimeout(done, 200);
		});
	});
});

