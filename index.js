'use strict';

// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

function prefixStream(prefixText) {
    var stream = through();
    // stream.write(prefixText);
    return stream;
}

// Plugin level function(dealing with files)
function gulpCriticalAgainst(prefixText) {

    if (!prefixText) {
        throw new PluginError('gulp-critical-against', 'Missing prefix text!');
    }
    prefixText = new Buffer(prefixText); // allocate ahead of time

    
    return through.obj(function (file, enc, cb) {
    	
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        if (file.isBuffer()) {
            console.log(file.contents);
        	// console.log("B", file.contents);
            // file.contents = Buffer.concat([prefixText, file.contents]);
        }
        if (file.isStream()) {
        	// console.log("C");
            // file.contents = file.contents.pipe(prefixStream(prefixText));
        }
        
        cb(null, file);

    });

}

// Exporting the plugin main function
module.exports = gulpCriticalAgainst;
