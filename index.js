var jsdom = require('jsdom');
var wind0w;

var compile = function (source, callback) {
  try {
    var fn = wind0w.Ember.Handlebars.precompile(source);
    callback(null, fn.toString());
  } catch (err) {
    callback(err, null)
  }
}

module.exports = function (source, callback) {
  if (wind0w) {
    compile(source, callback)
  } else {
    jsdom.env(
      '<p>dumb I need a dom</p>',
      [
        __dirname + "/lib/jquery.js",
        __dirname + "/lib/handlebars.js",
        __dirname + "/lib/ember.js"
      ],
      function(errors, window) {
        wind0w = window
        compile(source, callback)
      }
    );
  }
}

