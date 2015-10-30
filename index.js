'use strict';

// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var criticalcss = require('criticalcss');
var path = require('request');
var PluginError = gutil.PluginError;

// Plugin level function(dealing with files)
function gulpCriticalAgainst(obj) {

    var url = obj.url;

    console.log(url);

    // if (!prefixText) {
    //     throw new PluginError('gulp-critical-against', 'Missing prefix text!');
    // }
    // prefixText = new Buffer(prefixText); // allocate ahead of time

    
    return through.obj(function (file, enc, cb) {
    	
        if (file.isNull() || file.isStream()) {
            // return empty file
            return cb(null, file);
        }
        if (file.isBuffer()) {
            criticalcss,getRules(file.contents, function(err, output) {
                if (err) {
                    throw new Error(err);
                } else {
                    criticalcss.findCritical(url, { rules: JSON.parse(output) }, function(err, output) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            console.log(output);
                        } 
                    });
                }
            });
        }
        
        
        cb(null, file);

    });

}

// Exporting the plugin main function
module.exports = gulpCriticalAgainst;
