var jsdom = require('jsdom');

module.exports = function (source, callback) {
  jsdom.env(
    '<p>dumb I need a dom</p>',
    [
      __dirname + "/lib/jquery.js",
      __dirname + "/lib/handlebars.js",
      __dirname + "/lib/ember.js"
    ],
    function(errors, window) {
      try {
        var fn = window.Ember.Handlebars.precompile(source);
        callback(null, fn.toString());
      } catch (err) {
        callback(err, null)
      }
    }
  );
}