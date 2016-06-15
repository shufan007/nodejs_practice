//sinon_test.js

/*
// sinon.js: spy, stub, mock

spy:
A test spy is a function that records arguments, return value, the value of this and exception thrown (if any) for all its calls.
A test spy can be an anonymous function or it can wrap an existing function.

Test stubs:
Test stubs are functions (spies) with pre-programmed behavior. 
They support the full test spy API in addition to methods which can be used to alter the stub’s behavior.

Mocks:
Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations.
 A mock will fail your test if it is not used as expected.

*/

var assert = require("chai").assert; 
var sinon = require("sinon");
var fs = require("fs");


function myReadFile(path){
    var content = fs.readFileSync(path);
    return "<" + content + ">"
}

var myObject = { 
	myName: "shufan ", 
	changeName: function(inName){
		this.myName = inName;
	},
	getName: function(){
		return myName;
	}	
}

function fake(in_arg){
	return in_arg;
}

function once(fn) {
    var returnValue, called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}


describe('sinon', function(){

/* **************************** sinon.spy() test ************************/
	describe('#spy()', function(){

	    before(function(){ 

	    });

		it("calls the original function", function () {
		    var cb = sinon.spy();
		    var proxy = once(cb);

		    proxy();

		    assert(cb.called);
		});

		it("calls the original function only once", function () {
		    var callback = sinon.spy();
		    var proxy = once(callback);

		    proxy();
		    proxy();

		    assert(callback.calledOnce);
		    // ...or:
		    // assert.equals(callback.callCount, 1);
		});

		it("calls original function with right this and args", function () {
		    var callback = sinon.spy();
		    var proxy = once(callback);
		    var obj = {};

		    proxy.call(obj, 1, 2, 3);

		    assert(callback.calledOn(obj));
		    assert(callback.calledWith(1, 2, 3));
		});

	    after(function(){
	        
	    });
    });

	describe("test fs.readFileSync with sinon.spy",function(){

	    before(function(){
	        sinon.spy(fs, 'readFileSync');
	    });

	    it("fs.readFileSync should called more than once",function(){

	    	myReadFile("sinon_test.js");
	    	myReadFile("chai_test.js");
	    	fs.readFileSync.callCount > 1;
	    	fs.readFileSync.withArgs("sinon_test.js").calledOnce;
	    	//fs.readFileSync("a.txt").throws(" InputError");
	    });    

	    after(function(){
	        fs.readFileSync.restore();
	    });
	});     

/* **************************** sinon.stub() test ************************/
	describe('#stub()', function(){

	    before(function(){ 

	    });

		it("returns the return value from the original function", function () {
		    var callback = sinon.stub().returns(42);
		    var proxy = once(callback);

		    assert.equal(proxy(), 42);
		});

	    after(function(){
	        
	    });
    });

	describe("test1: myObject.getName with sinon.stub",function(){

	    before(function(){
	        sinon.stub(myObject, "getName", fake);
	    });

	    it("should return a.txt", function(){
	        assert.equal(myObject.getName("a.txt"),"a.txt");	        
	    });

	    after(function(){
	        myObject.getName.restore();
	    });
	});

	describe("test2: myReadFile with sinon.stub",function(){

	    before(function(){
	        sinon.stub(fs, 'readFileSync').withArgs('a.txt').returns('test.txt');
	    });

	    it("should return <test.txt>",function(){
	        assert.equal(myReadFile("a.txt"),"<test.txt>");
	        assert.equal(fs.readFileSync.callCount, 1);
	    });

	    after(function(){
	        fs.readFileSync.restore();
	    });
	});     

/* **************************** sinon.mock() test ************************/
	describe('#mock()', function(){

	    before(function(){ 

	    });

		it("returns the return value from the original function", function () {
		    var myAPI = { method: function () {} };
		    var mock = sinon.mock(myAPI);
		    mock.expects("method").once().returns(42);

		    var proxy = once(myAPI.method);

		    assert.equal(proxy(), 42);
		    mock.verify();
		    mock.restore();
		});

	    after(function(){
	        
	    });
    }); 

	describe("test1: myObject.getName with sinon.mock",function(){

	    before(function(){
	        
	    });

	    it("myObject.changeName should called at least twice",function(){

	    	mock = sinon.mock(myObject);
	        mock.expects("changeName").atLeast(2).withArgs('sinon');

	        myObject.changeName('sinon');
	        myObject.changeName('sinon');

	        mock.verify();

	        mock.restore();
	    });

	    after(function(){
	        
	    });
	});    

/* **************************** sinon Matchers test ************************/
	describe('#Matchers', function(){

	    var book = {
	        pages: 42,
	        author: "cjno"
	    };

	    before(function(){ 

	    });

		it("test should assert fuzzy", function () {

		    var spy = sinon.spy();

		    spy(book);

		    sinon.assert.calledWith(spy, sinon.match({ author: "cjno" }));
		    sinon.assert.calledWith(spy, sinon.match.has("pages", 42));

		});

		it("test should stub method differently based on argument types", function () {

		    var callback = sinon.stub();
		    callback.withArgs(sinon.match.string).returns(true);
		    callback.withArgs(sinon.match.number).throws(" TypeError");

		    callback("abc"); // Returns true
		    callback(123); // Throws TypeError

		});		

	    after(function(){
	        
	    });
    });

});

