"use strict";

/*

3. Create a function to copy a file. 
Function should return a Promise, that will be failed (rejected) if an error like: "file doesn't exist" occurs. 
Promise should be fulfilled when copying operation is over. 
Use bluebird's promises to handle asynchronous calls and errors. 
Do not use promisifyAll or promisify at all. 
Function should be returned to user through module.exports.

Tip:
you can use fs module and read/write streams for reading and writing to a file. 

*/

/*
//var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');

var src = process.argv[2];
var dest = process.argv[3];

// option1

var readFileAsync = function(filename){
	return new Promise(function(fulfill, reject){
		fs.readFile(filename, 'utf8', function(err, data){
			if (err){return reject(err);}
			return fulfill(data);
		});
	});	
};

var writeFileAsync = function(filename, data){
	return new Promise(function(fulfill, reject){
		fs.writeFile(filename, data, 'utf8', function(err, data){
			if (err){return reject(err);}
			return fulfill(1);
		});
	});	
};


readFileAsync(file)
.then(function(data){
	return writeFileAsync(copiedFile, data);
})
.then(function(stat){
	if (stat === 1){
		process.stdout.write("copy success");
	}
	else{
		process.stdout.write("copy failed");		
	}
})
.catch(function (err){
	console.error(err);
});

*/

/*
// option2

var copyFileAsync = function(src, dest){
	return new Promise(function(fulfill, reject){
		fs.stat(src, function(err, stats){
			if (err || (stats.isFile() === false)){
				return reject(err);
			}
		})
		var readerStream = fs.createReadStream(src);
		var writerStream = fs.createWriteStream(dest);
		readerStream.pipe(writerStream);
		return fulfill(1);
	});	
};

copyFileAsync(src, dest)
.then(function(stat){
	if (stat === 1){
		process.stdout.write("copy success");
	}
	else{
		process.stdout.write("copy failed");		
	}
})
.catch(function (err){
	console.error(err);
});

module.exports = copyFileAsync;

*/
// option3
var fs = require('fs');
var Promise = require('bluebird').Promise;

var copyFileAsync = function(src, dest){
	return new Promise(function(fulfill, reject){
		var readerStream = fs.createReadStream(src);
		var writerStream = fs.createWriteStream(dest);
		readerStream.on("error", reject);
		writerStream.on("error", function (error){
			reject(error);
		});

		readerStream.on("end", function() {
			writerStream.end();
			fulfill(true);
		});

		readerStream.pipe(writerStream);		
	});	
};

module.exports.copyFileAsync = copyFileAsync;


