//lodash_test.js

//load the modern build
var _ = require('lodash');

/*
//load a method categorg
var array = require('lodash/array');
*/

var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should(); //actually call the function

describe('lodash', function() {

	describe('#Basic display', function() {
		describe('#.assign basic test', function() {
			//	

			it('.assign basic test', function() {
				var obj = _.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 });

				//console.log(obj);
				obj.should.to.be.deep.equal({'a': 1 ,  'b': 2,  'c': 3});
			});
		});

		describe('#.map', function() {
			//	

			it('.map basic test', function() {
				var obj = _.map([1, 2, 3], function(n) {return n*3; });

				//console.log(obj);
				obj.should.to.be.deep.equal([3, 6, 9]);
			});
		});
	});

	describe('#.chain', function() {
		var users = [
			{ 'user': 'barney', 'age': 36 },
			{ 'user': 'fred', 	'age': 40 },
			{ 'user': 'pebble', 'age': 18 },
		];

		beforeEach(function(done) {
			done();
		});
		afterEach(function(done) {
			done();
		});

		it('join names', function() {
			var names = _.chain(users)
			.map(function (user) {
				return user.user;
			})
			.join(" , ")
			.value();

			//console.log(names);
			names.should.to.be.deep.equal('barney , fred , pebble');
		});

		it('get youngest user test 1', function() {
			var youngest = _.chain(users)
			.min(function (user) {
				return user.age;
			})
			.value();

			//console.log(youngest);
			youngest.should.to.be.deep.equal({ 'user': 'pebble', 'age': 18 });
		});	

		it('get youngest user test 2', function() {
			var youngest = _.chain(users)
			.sortBy("age")
			.map(function (user) {
				//console.log("map ", user);
				return user;
			})
			.first()
			.value();

			//console.log(youngest);
			youngest.should.to.be.deep.equal({ 'user': 'pebble', 'age': 18 });
		});	

		it('get oldest user', function() {
			var oldest = _.chain(users)
			.max(function (user) {
				return user.age;
			})
			.value();

			//console.log(oldest);
			oldest.should.to.be.deep.equal({ 'user': 'fred', 	'age': 40 });
		});	

		it('map: array --> obj', function() {
			var userObj = _.chain(users)
			.map(function (user) {
				return [user.user, user.age];
			})
			.zipObject()
			.value();

			//console.log(userObj);
			userObj.should.to.be.deep.equal({ barney: 36, fred: 40, pebble: 18 });
		});	

	});

	describe('#Array Methods', function() {
		describe('#.chunk', function() {
			/* _.chunk(array, [size=1])
				Creates an array of elements split into groups the length of size
			*/
			beforeEach(function (done) {
				done();
			});
			afterEach(function (done) {
				done();
			});

			it('.chunk basic test', function() {
				var arr = [1, 2, 3, 4];
				var obj1 = _.chunk(arr, 2);
				var obj2 = _.chunk(arr, 3);

				//console.log(obj);
				obj1.should.to.be.deep.equal([[1, 2], [3, 4]]);
				obj2.should.to.be.deep.equal([[1, 2, 3], [4]]);
			});
		});

		describe('#.compact', function() {
			/*	_.compact(array)
				Creates an array with all falsey values removed.
			*/
			beforeEach(function (done) {
				done();
			});
			afterEach(function (done) {
				done();
			});

			it('.chunk basic test', function() {
				var arr = [0, 1, false, 2, '', null, 3, undefined, NaN];
				var obj = _.compact(arr);

				obj.should.to.be.deep.equal([1, 2, 3]);
			});
		});

		describe('#.difference', function() {
			/*	_.difference(array, [values])
				Creates an array of unique array values not included in the other provided arrays using SameValueZero for equality comparisons.
			*/
			var arr;

			beforeEach(function (done) {
				arr = [1, 2, 2, 3, 4];
				done();
			});
			afterEach(function (done) {
				done();
			});

			it('remove 1 elements', function() {
				
				var values = [3, 5];
				var obj = _.difference(arr, values);

				obj.should.to.be.deep.equal([1, 2, 2, 4]);
			});

			it('remove 3 elements', function() {
				var values = [2, 4];
				var obj = _.difference(arr, values);

				obj.should.to.be.deep.equal([1, 3]);
			});			
		});

		describe('#.drop', function() {
			/*	_.drop(array, [n=1])
				Creates a slice of array with n elements dropped from the beginning.
			*/
			var arr;

			beforeEach(function (done) {
				arr = [1, 2, 3];
				done();
			});
			afterEach(function (done) {
				done();
			});

			it('remove some elements', function() {
				
				_.drop(arr).should.to.be.deep.equal([2, 3], 'remove 1 elements');
				_.drop(arr, 2).should.to.be.deep.equal([3], 'remove 2 elements');
				_.drop(arr, 5).should.to.be.deep.equal([], 'remove 5 elements');
				_.drop(arr, 0).should.to.be.deep.equal([1, 2, 3], 'remove 0 elements');
			});									
		});

		describe('#.dropRight', function() {
			/*	_.dropRight(array, [n=1])
				Creates a slice of array with n elements dropped from the end.
			*/
			var arr;

			beforeEach(function (done) {
				arr = [1, 2, 3];
				done();
			});
			afterEach(function (done) {
				done();
			});

			it('remove some elements', function() {
				
				_.dropRight(arr).should.to.be.deep.equal([1, 2], 'remove 1 elements');
				_.dropRight(arr, 2).should.to.be.deep.equal([1], 'remove 2 elements');
				_.dropRight(arr, 5).should.to.be.deep.equal([], 'remove 5 elements');
				_.dropRight(arr, 0).should.to.be.deep.equal([1, 2, 3], 'remove 0 elements');
			});									
		});

		describe('#.dropRightWhile', function() {
			/*	_.dropRightWhile(array, [predicate=_.identity], [thisArg])
				Creates a slice of array excluding elements dropped from the end. 
			*/
			var users = [
			  { 'user': 'barney',  'active': true },
			  { 'user': 'fred',    'active': false },
			  { 'user': 'pebbles', 'active': false }
			];

			beforeEach(function (done) {				
				done();
			});
			afterEach(function (done) {
				done();
			});

			it('remove some elements', function() {
				var arr = [1, 2, 3];			
				var obj = _.dropRightWhile(arr, function(n) {
				  return n > 1;
				});				
				obj.should.to.be.deep.equal([1], 'remove 2 elements');
			});	

			it('get user test: ', function() {				
				var obj1 = _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
				var obj2 = _.pluck(_.dropRightWhile(users, 'active', false), 'user');
				var obj3 = _.pluck(_.dropRightWhile(users, 'active'), 'user');
				
				obj1.should.to.be.deep.equal(['barney', 'fred']);
				obj2.should.to.be.deep.equal(['barney']);
				obj3.should.to.be.deep.equal(['barney', 'fred', 'pebbles']);
			});
		});

		describe('#.dropWhile', function() {
			/*	_.dropWhile(array, [predicate=_.identity], [thisArg])
				Creates a slice of array excluding elements dropped from the beginning. 
			*/
			var users = [
			  { 'user': 'barney',  'active': false },
			  { 'user': 'fred',    'active': true },
			  { 'user': 'pebbles', 'active': true }
			];

			beforeEach(function (done) {				
				done();
			});
			afterEach(function (done) {
				done();
			});

			it('remove some elements', function() {
				var arr = [1, 2, 3];			
				var obj = _.dropWhile(arr, function(n) {
				  return n <3;
				});				
				obj.should.to.be.deep.equal([3]);
			});	

			it('get user test: ', function() {				
				var obj1 = _.pluck(_.dropWhile(users, { 'user': 'barney',  'active': false }), 'user');
				var obj2 = _.pluck(_.dropWhile(users, 'active', false), 'user');
				var obj3 = _.pluck(_.dropWhile(users, 'active'), 'user');
				
				obj1.should.to.be.deep.equal(['fred', 'pebbles']);
				obj2.should.to.be.deep.equal(['fred', 'pebbles']);
				obj3.should.to.be.deep.equal(['barney', 'fred', 'pebbles']);
			});	
		});

		describe('#.fill', function() {
			/*	_.fill(array, value, [start=0], [end=array.length])
				Fills elements of array with value from start up to, but not including, end. 
			*/

			it('test1', function() {			
				_.fill([1, 2, 3], 'a').should.to.be.deep.equal(['a', 'a', 'a']);
				_.fill(Array(3), 2).should.to.be.deep.equal([2, 2, 2]);
				_.fill([1, 2, 3, 4], 'a', 1, 3).should.to.be.deep.equal([1, 'a', 'a', 4]);
			});												
		});	

		describe('#.fill', function() {
			/*	_.fill(array, value, [start=0], [end=array.length])
				Fills elements of array with value from start up to, but not including, end. 
			*/

			it('test1', function() {			
				_.fill([1, 2, 3], 'a').should.to.be.deep.equal(['a', 'a', 'a']);
				_.fill(Array(3), 2).should.to.be.deep.equal([2, 2, 2]);
				_.fill([1, 2, 3, 4], 'a', 1, 3).should.to.be.deep.equal([1, 'a', 'a', 4]);
			});												
		});

		describe('#.findIndex', function() {
			/*	_.findIndex(array, [predicate=_.identity], [thisArg])
				Creates a slice of array excluding elements dropped from the beginning. 
			*/
			var users = [
			  { 'user': 'barney',  'active': false },
			  { 'user': 'fred',    'active': false },
			  { 'user': 'pebbles', 'active': true }
			];

			it('get user index test: ', function() {
				var obj1 = _.findIndex(users, function (chr) {
					return  chr.user == 'barney'; });
				var obj2 = _.findIndex(users, function (chr) {
					return  chr.user == 'shufan'; });									
				var obj3 = _.findIndex(users, { 'user': 'fred',  'active': false });
				var obj4 = _.findIndex(users, 'active', false);
				var obj5 = _.findIndex(users, 'active');
				
				obj1.should.to.be.equal(0, 'obj1');
				obj2.should.to.be.equal(-1, 'obj2');
				obj3.should.to.be.equal(1, 'obj3');
				obj4.should.to.be.equal(0, 'obj4');
				obj5.should.to.be.equal(2, 'obj5');
			});	
		});

		describe('#.sortedUniqBy', function() {
			/*	_.sortedUniqBy(array, [iteratee])
			This method is like _.uniqBy except that it’s designed and optimized for sorted arrays
			*/

			it('test1 ', function() {
				var arr = [1.1, 1.2, 2.3, 2.4];
				
				_.sortedUniqBy(arr, Math.floor).should.to.be.deep.equal([1.1, 2.3]);

			});	
		});					
	});	
});	