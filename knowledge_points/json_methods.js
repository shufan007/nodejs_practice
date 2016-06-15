//json_methods.js
/* *************************************************
methods of JSON obj:
.parse 		JSON string  --> JS object
.stringify  JS value  --> JSON string 

eval

**************************************************** */

var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should(); //actually call the function

describe('JSON', function() {
	describe('#.parse', function() {
		//JSON.parse(text, reviver)
		//This method parses a JSON text to produce an object or array.

		var jsonStr = '{"name": "shufan", "Id": 7710, "company": "NOKIA"}';
		it('basic test ', function() {
			var jsonObj = JSON.parse(jsonStr);
			expect(jsonObj.name).to.equal('shufan');
			expect(jsonObj.Id).to.equal(7710);
			expect(jsonObj.company).to.equal('NOKIA');
		});

		it('use reviver ', function() {
			var jsonObj = JSON.parse(jsonStr, function(key, value) {
				if (typeof value === 'number') {
					value = null;
				}
				return value;
			});
			expect(jsonObj.name).to.equal('shufan');
			expect(jsonObj.Id).to.equal(null);
			expect(jsonObj.company).to.equal('NOKIA');
		});
					
	});

	describe('#.stringify', function() {
		//JSON.stringify(value [, replacer] [, space]);
		function switchUpper(key, value) {
			return value.toString().toUpperCase();
		}

		var jsonStr = '{"name":"shufan","Id":7710,"company":"NOKIA"}';
		var jsonObj = JSON.parse(jsonStr);
		it('One parameter ', function() {
			expect(JSON.stringify(jsonObj)).to.equal(jsonStr);

		});

		it('Two parameters with first parameter is an array', function() {
			var arr = new Array();
			arr[0] = 'a';
			arr[1] = 'b',
			arr[2] = 'c';

			var obj = new Object();
			obj.a = 'a';
			obj.b = 'b';
			obj.c = 'c';

			var json = JSON.stringify(arr, switchUpper);

			expect(json).to.be.deep.equal('"A,B,C"');

		});		
					
	});	
});
