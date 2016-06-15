//unit_test.js

"use strict";

/*
exports.testSomething = function(test){

    test.expect(1);
    test.ok(1==1, 'this assertion should pass');
    test.done();
};
*/

/*
exports.testSomethingElse = function(test){

    test.equal(1, 3, 'this assertion should fail');
    test.done();
};
*/


module.exports = {
	"1st test": function (test) {
		test.equal(1, 1);
		test.done();
	},
	"2nd test": function (test) {
		test.ok(true, "custom message");
		test.done();
	},

	"3rd test": function (test) {
		test.equal(1, 2);
		test.done();
	},
	"4th test": function (test) {
		test.ok(false, "custom message");
		test.done();
	}	
};



module.exports = {
	setUp: function (done) {
		//console.log("do some setup"); 
		done();
	},
	tearDown: function (done) {
		//console.log("do some teardown "); 
		done();
	},

	"1st test": function (test) {
		console.log("test 1"); 
		test.done();
	},
	"2nd test": function (test) {
		console.log("test 2"); 
		test.done();
	},

	"asynch test": function (test) {
		setTimeout(function () {
			test.done();
		}, 1000);
		console.log("test reached end of current scope");
	}	
};

