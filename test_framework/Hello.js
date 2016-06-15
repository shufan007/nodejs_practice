//Hello.js

var Hello = function (){
	//this.m_name = "javascript";
	this.setName = function (inName) {
		this.m_name = inName;
	};

	this.sayHello = function() {
		return 'Hello ' + this.m_name;
	};	
}
module.exports = Hello;
