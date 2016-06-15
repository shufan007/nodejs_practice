//chai_test.js
/*

Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

chai: asert, expect, should
*/


//chai, basic example
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should(); //actually call the function

describe('chai', function() {
	describe('#assert', function() {

		it('test case 1', function() {
			var foo = 'bar'
			  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

			assert.typeOf(foo, 'string'); // without optional message
			assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
			assert.equal(foo, 'bar', 'foo equal `bar`');
			assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
			assert.lengthOf(foo, 4, 'foo`s value has a length of 3');
			assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
		});
	});

	/* BDD style */
	describe('#expect', function() {
		it.only('test case 1', function() {
			var foo = 'bar'
			  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
			
			expect(foo).a('string');  		
			expect(foo).to.be.a('string');
			expect(foo).to.equal('bar');
			expect(foo).to.have.length(3);
			expect(beverages).to.have.property('tea').with.length(3);
		});

		it('test case 2', function() {
			var answer = 43;

			// AssertionError: expected 43 to equal 42.
			expect(answer).to.equal(42); 

			// AssertionError: topic [answer]: expected 43 to equal 42.
			expect(answer, 'topic [answer]').to.equal(42);
		});		
	});	

	describe('#should', function() {

		it('test case 1', function() {
			var foo = 'bar'
			  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
			  		
			foo.should.be.a('string');
			foo.should.equal('bar');
			foo.should.have.length(3);
			beverages.should.have.property('tea').with.length(3);
		});
		
	});

});





