var jsdom = require('jsdom');
var wind0w;

var compile = function (source, options, callback) {
  try {
    var fn = wind0w.Ember.Handlebars.precompile(source, options);
    callback(null, fn.toString());
  } catch (err) {
    callback(err, null)
  }
}

exports.precompile = function (source, options, callback) {
  if (!options) {
    options = {}
  }

  if (wind0w) {
    compile(source, options, callback)
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
        compile(source, options, callback)
      }
    );
  }
}

