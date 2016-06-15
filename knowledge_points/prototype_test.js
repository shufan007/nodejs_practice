//prototype_test.js
// defination of classes or objects

// prototype + constructor
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
}

Car.prototype.getColor = function() {
  return this.color;
};

// dynamic prototype\
function DCar(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
  
  if (typeof DCar._initialized == "undefined") {
    DCar.prototype.getColor = function() {
      return this.color;
    };
	
    DCar._initialized = true;
  }
}


// ---------------  test -----------------
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should(); //actually call the function

describe('Cars', function(){
	describe('Car', function(){
		
		before(function(done) {
			//console.log('before called')
			done();
		});

		it("test1: 3 drivers", function(done){
			var oCar1 = new Car("red",4,23);
			oCar1.drivers.push("Bill");

			expect(oCar1).to.have.property('color').to.equal('red');
			expect(oCar1).to.have.property('drivers').with.length(3);
			expect(oCar1.drivers[2]).to.equal('Bill');
			expect(oCar1.getColor()).to.equal('red');

			done();	
		});

		it("test2: 2 drivers", function(done){
			var oCar2 = new Car("blue",3,25);

			oCar2.should.have.property('color').to.equal('blue');
			oCar2.should.have.property('drivers').with.length(2);

			done();	
		});

		after(function(done) {
			//console.log('after called')
			done();
		});		

	});

	describe('DCar', function(){
		
		before(function(done) {
			//console.log('before called')
			done();
		});

		it("test1: 3 drivers", function(done){
			var oCar1 = new DCar("red",4,23);
			oCar1.drivers.push("Bill");

			expect(oCar1).to.have.property('color').to.equal('red');
			expect(oCar1).to.have.property('drivers').with.length(3);
			expect(oCar1.drivers[2]).to.equal('Bill');
			expect(oCar1.getColor()).to.equal('red');

			done();	
		});

		it("test2: 2 drivers", function(done){
			var oCar2 = new Car("blue",3,25);

			oCar2.should.have.property('color').to.equal('blue');
			oCar2.should.have.property('drivers').with.length(2);

			done();	
		});

		after(function(done) {
			//console.log('after called')
			done();
		});

	});	
});
