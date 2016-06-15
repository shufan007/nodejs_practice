//inherit_test.js

// object masquerading
function ClassA(sColor) {
	this.color = sColor;
	this.sayColor = function() {
		//console.log(this.color);
		return this.color;
	};
}

/*  ************************ test ************************** */
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should(); //actually call the function

describe('inherit_test', function(){
	describe('object masquerading', function(){

		function ClassB(sColor, sName) {
			this.newMethod = ClassA;
			this.newMethod(sColor);
			delete this.newMethod;
			this.name = sName;
			this.sayName = function() {
				//console.log(this.name);
				return this.name;
			}
		}

		before(function(done) {
			done();
		});

		it("test1: ", function(done){
			var objA = new ClassA("blue");
			var objB = new ClassB("red", "John");

			expect(objA).to.have.property('color').to.equal('blue');
			expect(objA.sayColor()).to.equal('blue');

			expect(objB).to.have.property('color').to.equal('red');
			expect(objB).to.have.property('name').to.equal('John');
			expect(objB.sayColor()).to.equal('red');
			expect(objB.sayName()).to.equal('John');

			done();	
		});

		after(function(done) {
			done();
		});		
	});

	describe('call() and apply() method', function(){
		// call() and apply() method
		function sayColor(sPrefix, sSuffix) {
			return sPrefix + this.color + ", " + sSuffix;
		};
		/*
		var obj = new Object();
		obj.color = "blue";

		sayColor.call(obj, "The color is ", "a very nice color indeed.");
		sayColor.apply(obj, new Array("The color is ", "a very nice color indeed."));
		*/	

		before(function(done) {
			done();
		});

		it("call() and apply() method test ", function(done){
			var obj = new Object();
			obj.color = "blue";
			var expect_str = "The color is blue, a very nice color indeed."

			expect(sayColor.call(obj, "The color is ", "a very nice color indeed."))
			.to.equal(expect_str);

			expect(sayColor.apply(obj, new Array("The color is ", "a very nice color indeed.")))
			.to.equal(expect_str);			

			done();	
		});

		after(function(done) {
			done();
		});		
	});	

	describe('inherit with call() and apply() method', function(){

		// inherit with call() method
		function ClassB_call(sColor, sName) {
			//this.newMethod = ClassA;
			//this.newMethod(sColor);
			//delete this.newMethod;
			ClassA.call(this, sColor);

			this.name = sName;
			this.sayName = function() {
				//console.log(this.name);
				return this.name;
			}	
		}

		// inherit with apply() method
		function ClassB_apply1(sColor, sName) {

			ClassA.apply(this, new Array(sColor));

			this.name = sName;
			this.sayName = function() {
				//console.log(this.name);
				return this.name;
			}	
		}

		// apply() method
		function ClassB_apply2(sColor, sName) {

			ClassA.apply(this, arguments);

			this.name = sName;
			this.sayName = function() {
				//console.log(this.name);
				return this.name;
			}	
		}

		before(function(done) {
			done();
		});

		it("ClassB_call: ", function(done){

			var objB_call = new ClassB_call("red", "John");

			expect(objB_call).to.have.property('color').to.equal('red');
			expect(objB_call).to.have.property('name').to.equal('John');
			expect(objB_call.sayColor()).to.equal('red');
			expect(objB_call.sayName()).to.equal('John');

			done();	
		});

		it("ClassB_apply1: ", function(done){
			var objB_apply1 = new ClassB_apply1("red", "John");

			expect(objB_apply1).to.have.property('color').to.equal('red');
			expect(objB_apply1).to.have.property('name').to.equal('John');
			expect(objB_apply1.sayColor()).to.equal('red');
			expect(objB_apply1.sayName()).to.equal('John');

			done();	
		});

		it("ClassB_apply2: ", function(done){
			var objB_apply2 = new ClassB_apply2("red", "John");

			expect(objB_apply2).to.have.property('color').to.equal('red');
			expect(objB_apply2).to.have.property('name').to.equal('John');
			expect(objB_apply2.sayColor()).to.equal('red');
			expect(objB_apply2.sayName()).to.equal('John');

			done();	
		});

		after(function(done) {
			done();
		});		
	});

	describe('prototype chaining:', function(){
		// prototype chaining

		function ClassA() {
			ClassA.prototype.color = "blue";
			ClassA.prototype.sayColor = function() {
				//console.log(this.color);
				return this.color;
			};	
		}

		function ClassB() {}
		ClassB.prototype = new ClassA();
		ClassB.prototype.name = "";
		ClassB.prototype.sayName = function() {
			//console.log(this.name);
			return this.name;
		}
				
		before(function(done) {
			done();
		});

		it("test1: ", function(done){
			var objA = new ClassA();
			var objB = new ClassB();
			objA.color = "blue";
			objB.color = "red";
			objB.name = "John";

			expect(objA.sayColor()).to.equal('blue');
			expect(objB.sayColor()).to.equal('red');
			expect(objB.sayName()).to.equal('John');

			expect(objB instanceof ClassA).to.be.ok;
			expect(objB instanceof ClassB).to.be.ok;

			done();	
		});
		after(function(done) {
			done();
		});		
	});

	describe('mixed of object masquerading and prototype chaining:', function(){

		// mixed way:
		// mixed of object masquerading and prototype chaining

		function ClassA(sColor) {
			this.color = sColor;
		}

		ClassA.prototype.sayColor = function() {
			return this.color;
		};

		function ClassB(sColor, sName) {
			ClassA.call(this, sColor);
			this.name = sName;
		}

		ClassB.prototype = new ClassA();

		ClassB.prototype.sayName = function() {
			return this.name;
		};
		
		before(function(done) {
			done();
		});

		it("test1: ", function(done){
			var objA = new ClassA("blue");
			var objB = new ClassB("red", "John");

			expect(objA.sayColor()).to.equal('blue');
			expect(objB.sayColor()).to.equal('red');
			expect(objB.sayName()).to.equal('John');

			expect(objB instanceof ClassA).to.be.ok;
			expect(objB instanceof ClassB).to.be.ok;

			done();	
		});
		
		after(function(done) {
			done();
		});

	});

});
