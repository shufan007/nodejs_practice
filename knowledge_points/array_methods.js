// arrayMethods_test.js

/* *************************************************
methods of Array:
.forEach 		  --> traverse
.some and .every  --> assert
.join and .concat --> combine
.pop, .push, .shift, and .unshift --> for stack and queue
.map 
.filter 
.sort
.reduce, .reduceRight -->compute
.slice 	--> copy
.splice
.indexOf  --> search
in 
.reverse

**************************************************** */

var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should(); //actually call the function

describe('Array', function() {
	describe('#.forEach', function() {
		//.forEach(function (value, index, array)

		var arr;

		beforeEach(function() {
			arr = ['1', '2', '3', '4', '5'];
		});

		afterEach(function() {

		});	

		it('test case 1: char transform', function() {
			var arr = ['_', 't', 'a', 'n', 'i', 'f', ']'];
			arr.forEach(function (value, index, array) {
			    this.push(String.fromCharCode(value.charCodeAt() + index + 2))
			}, out = [])
			//console.log(out.join(''));
			expect(out.join('')).to.equal('awesome');
		});

		it('test case 2: returned numbers should add 1', function() {
			arr.forEach(function (value, index, array) {
			    this.push(String.fromCharCode(value.charCodeAt() + 1))
			}, out = ['1'])
			//console.log(out.join(''));
			expect(out.join('')).to.equal('123456');
		});

		it('test case 3: predefine the refered array', function() {
			var out = ['1'];
			arr.forEach(function (value, index, array) {
			    this.push(String.fromCharCode(value.charCodeAt() + 1))
			}, out)
			//console.log(out.join(''));
			expect(out.join('')).to.equal('123456');
		});	

		it('test case 4: input as output', function() {
			arr.forEach(function (value, index, array) {
			    this[index] = String.fromCharCode(value.charCodeAt() + array.length - index)
			}, arr)
			//console.log(arr.join(''));
			expect(arr.join('')).to.equal('66666');
		});						
	});

	describe('#.some', function() {
		//.some(function (value, index, array)

		var max;
		var arr = [10, 12, 10, 8, 5, 23];		
		var num;
		var callback = function (value, index, array) {			
			if (value > max) {
				max = value;
			}
			return value < num;
		}

		beforeEach(function() {
			max = -Infinity;
		});

		afterEach(function() {

		});

		it('test case 1: should return true', function() {
			num = 10;
			var satisfied = arr.some(callback);
			//console.log(max);
			expect(max).to.equal(12);
			expect(satisfied).to.be.ok;
		});

		it('test case 2: should return false', function() {
			num = 5;
			var satisfied = arr.some(callback);
			//console.log(max);
			expect(max).to.equal(23);
			expect(satisfied).to.be.nok;
		});					
	});

	describe('#.every', function() {
		//.every(function (value, index, array)

		var max;
		var arr = [10, 12, 10, 8, 5, 23];		
		var num;
		var callback = function (value, index, array) {
			if (value > max) {
				max = value;
			}
			return value < num;
		}

		beforeEach(function() {
			max = -Infinity;
		});

		afterEach(function() {

		});			

		it('test case 1: should return true', function() {
			num = 100;
			var satisfied = arr.every(callback);
			//console.log(max);
			expect(max).to.equal(23);
			expect(satisfied).to.be.ok;
		});

		it('test case 2: should return false', function() {
			num = 11;
			var satisfied = arr.every(callback);
			//console.log(max);
			expect(max).to.equal(12);
			expect(satisfied).to.be.nok;
		});					
	});

	describe('#.join', function() {
		var arr = ['1', '2', '3', '4', '5'];		

		it('join basic test ', function() {
			//console.log(arr.join());
			expect(arr.join()).to.be.equal('1,2,3,4,5');
			expect(arr.join('')).to.be.equal('12345');
			expect(arr.join('-')).to.be.equal('1-2-3-4-5');
		});				
	});

	describe('#.concat', function() {
		//array.concat(val, val2, val3, valn)

		it('array concat ', function() {
			var a = ['1','2'];
			var b1 = ['3'];
			var b2 = '3';
			var c = ['4','5'];
			expect(a.concat(b1,c)).to.be.deep.equal(['1','2','3','4','5']);
			expect(a.concat(b2,c)).to.be.deep.equal(['1','2','3','4','5']);
		});	

		it('obj concat ', function() {
			var a = {foo: 'bar'};
			var b = [1, 2, 3, a];
			var c = b.concat();

			//expect(b).to.be.equal(c);
			expect(b).to.be.deep.equal(c);
			expect(c[3]).to.be.equal(a);
		});						
	});


	describe('#.push, #.pop', function() {

		it('.push basic', function() {
			var a = ['1','2'];
			var b = '3';		
			var c = '4'

			a.push(b,c);
			expect(a).to.be.deep.equal(['1','2','3','4']);
		});	

		it('.pop basic', function() {
			var a = ['1','2'];

			expect(a.pop()).to.be.deep.equal('2');
			expect(a).to.be.deep.equal(['1']);
		});
			
		it('LIFO stack based on .push and .pop', function() {
			function Stack() {
				this._stack = [];
			}

			Stack.prototype.next = function() {
				return this._stack.pop();
			}

			Stack.prototype.add = function() {
				return this._stack.push.apply(this._stack, arguments);
			}

			var ostack = new Stack();
			ostack.add(1, 2, 3);

			expect(ostack.next()).to.be.equal(3);
			
		});							
	});

	describe('#.shift, #.unshift', function() {

		it('.shift basic ', function() {
			var a = ['1','2','3'];

			expect(a.shift()).to.be.equal('1');
			expect(a).to.be.deep.equal(['2','3']);
		});	

		it('.unshift basic', function() {
			var a = [3, 4];
			expect(a.unshift(1, 2)).to.be.equal(4);
			expect(a).to.be.deep.equal([1, 2, 3, 4]);
		});
			
		it('FIFO queue based on .shift and .unshift', function() {
			function Queue() {
				this._queue = [];
			}

			Queue.prototype.next = function() {
				return this._queue.shift();
			}

			Queue.prototype.add = function() {
				return this._queue.unshift.apply(this._queue, arguments);
			}

			var oqueue = new Queue();
			oqueue.add(1, 2, 3);

			expect(oqueue.next()).to.be.equal(1);
			
		});							
	});
	describe('#.map', function() {
		//Array.prototype.map(fn(value, index, array), thisArgument)

		it('test case 1: returned numbers should add 1', function() {
			var arr = [1, 2, 3, 4, 5];
			var result = arr.map(function (value, index, array) {
			    return value + 1;
			});

			expect(result).to.be.deep.equal([2, 3, 4, 5, 6]);
		});

		it('test case 2: ', function() {
			var arr = [void 0, null, false, '', 1];
			arr[7] = void 0;
			var result = arr.map(function (value, index, array) {
			    return value + 1;
			});
			console.log(result);
			expect(result[4]).to.be.equal(2);
		});

		it('test case 3: ', function() {
			var arr = ['1','2','3'];
			var result = arr.map(function (value, index, array) {
			    return parseInt(value, 10);
			});

			expect(result).to.be.deep.equal([1, 2, 3]);
		});

		it('test case 4: ', function() {
			var arr = [97, 98, 99];
			var result = arr.map(String.fromCharCode).join('');
			console.log(result);
			//expect(result).to.be.deep.equal('abc');
		});

	});	

	describe('#.filter', function() {

		it('test case 1: return satisfied values', function() {
			var arr = [1, 2, 3, 4, 5];
			var num = 3;
			var result = arr.filter(function (value) {
			    return value >= num;
			});

			expect(result).to.be.deep.equal([3, 4, 5]);
		});

		it('test case 2: return true values', function() {
			var arr = [void 0, null, false, '', 1];
			var result = arr.filter(function (value) {
			    return value;
			});

			expect(result).to.be.deep.equal([1]);
		});
	});	

	describe('#.sort', function() {
		//Array.prototype.sort(fn(a,b))

		var arr;
		beforeEach(function() {
			arr = [9, 80, 3, 10, 5, 6];
		});

		afterEach(function() {

		});	

		it('test case 1: ', function() {
				
			arr.sort();
			expect(arr).to.be.deep.equal([10, 3, 5, 6, 80, 9]);			
		});

		it('test case 2: ', function() {
			arr.sort(function (a,b) {
			    return a - b;
			});

			expect(arr).to.be.deep.equal([3, 5, 6, 9, 10, 80]);
		});

		it('test case 3: str sort', function() {
			
			arr_str = ['9', '80', '3', '10', '5', '6'];
			arr_str.sort()
			expect(arr_str).to.be.deep.equal(['10', '3', '5', '6', '80', '9']);	
		});		
	});	

	describe('#.reduce, reduceRight', function() {
		//.reduce(callback(previousValue, currentValue, index, array), initialValue)

		var arr_num = [1, 2, 3, 4];
			
		var arr_obj = [
			{ name: 'George' },
			{ name: 'Sam' },
			{ name: 'Pear' }
		];		

		it('implement a sum', function() {
			
			Array.prototype.sum = function () {
				return this.reduce(function (partial, value) {
					return partial + value;
				}, 0);
			};
				
			expect(arr_num.sum()).to.be.equal(10);			
		});

		it('implement a concat with .reduce', function() {
			
			function concat(input) {
				return input.reduce(function (partial, value) {
					if (partial) {
						partial += ', '
					}
					return partial + value.name;
				}, '');
			};


			expect(concat(arr_obj)).to.be.deep.equal('George, Sam, Pear');			
		});	

		it('implement a rconcat with .reduceRight', function() {
			
			function concat(input) {
				return input.reduceRight(function (partial, value) {
					if (partial) {
						partial += ', '
					}
					return partial + value.name;
				}, '');
			};

			expect(concat(arr_obj)).to.be.deep.equal('Pear, Sam, George');			
		});			
	});	

	describe('#.slice', function() {
		//Array.prototype.slice can be used to convert array-like objects into real arrays.
				
		it('basic test, array copy', function() {
			var arr = [1, 2, 3, 4, 5];
			var result = Array.prototype.slice.call(arr, 2);
			expect(result).to.be.deep.equal([3, 4, 5]);	
		});

		it('conform class array to real array', function() {
			var arr = { 0: 'a',
						1: 'b',
						2: 'c',
						length: 3};	

			var result1 = Array.prototype.slice.call(arr);
			var result2 = Array.prototype.slice.call(arr, 2);
			expect(result1).to.be.deep.equal(['a', 'b', 'c']);	
			expect(result2).to.be.deep.equal(['c']);
		});		
	});

	describe('#.splice', function() {
		//delete, insert

		var arr;
		beforeEach(function() {
			arr = [3, 4, 5, 6];
		});

		afterEach(function() {

		});	

		it('array delete test1', function() {
			var spliced = arr.splice(2);

			expect(arr).to.be.deep.equal([3, 4]);	
			expect(spliced).to.be.deep.equal([5, 6]);
		});

		it('array delete test2', function() {
			var spliced = arr.splice(2, 1);

			expect(arr).to.be.deep.equal([3, 4, 6]);	
			expect(spliced).to.be.deep.equal([5]);
		});

		it('insert 2 elements', function() {
			var inserted = arr.splice(0, 0, 1, 2);

			expect(arr).to.be.deep.equal([1, 2, 3, 4, 5, 6]);	
		});

		it('delete 1, insert 3 elements', function() {
			var inserted = arr.splice(0, 1, 1, 2, 3);

			expect(arr).to.be.deep.equal([1, 2, 3, 4, 5, 6]);	
		});		
	});

	describe('#.indexOf, .lastIndexOf', function() {
		// searched by value

		var a = {foo: 'bar'};
		var b = [a, 2, 3, 4];
		it('indexOf test', function() {

			expect(b.indexOf(2)).to.be.equal(1);
			expect(b.indexOf(1)).to.be.equal(-1);
			expect(b.indexOf(a)).to.be.equal(0);
			expect(b.indexOf({foo: 'bar'})).to.be.equal(-1);
		});

		it('lastIndexOf test', function() {

			expect(b.lastIndexOf(2)).to.be.equal(1);
			expect(b.lastIndexOf(1)).to.be.equal(-1);
			expect(b.lastIndexOf(a)).to.be.equal(0);
		});			
	});	

	describe('in', function() {
		// searched by key

		var a = {foo: 'bar'};
		var b = [a, 2, 3, 4];

		var arr = { 0: 'a',
					1: 'b',
					2: 'c',
					length: 3};	

		it('indexOf test', function() {

			expect(1 in arr).to.be.ok;
			expect(3 in arr).to.be.nok;

			expect('bar' in a).to.be.nok;

			expect(0 in b).to.be.ok;
			expect(a in b).to.be.nok;
			expect(4 in b).to.be.nok;
		});		
	});	

	describe('#.reverse', function() {
		// 

		var a = [1, 2, 3];

		var b = { 0: 'a',
					1: 'b',
					2: 'c',
					length: 3};	

		it('test1:', function() {

			expect(a.reverse()).to.be.deep.equal([3,2,1]);
		});		
	});				
});
