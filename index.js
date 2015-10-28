'use strict';

var Stream = require('stream');
var Path = require('path');

var gulpCriticalAgainst = function gulpCriticalAgainst (obj) {

  var stream = new Stream.Transform({objectMode: true});

  return stream;
};

module.exports = gulpCriticalAgainst;
