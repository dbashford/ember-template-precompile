var jsdom = require('jsdom');
var fs = require("fs");
var combinedSource;

module.exports = function (source, callback) {

  if(!combinedSource) {
    var jquery = fs.readFileSync(__dirname + "/lib/jquery.js").toString();
    var handlebars = fs.readFileSync(__dirname + "/lib/handlebars.js").toString();
    var ember = fs.readFileSync(__dirname + "/lib/ember.js").toString();
    combinedSource = jquery + "\n" + handlebars + "\n" + ember + "\n"
  }

  jsdom.env({
    html: '<p>dumb I need a dom</p>',
    src: [combinedSource],
    done: function(errors, window) {
      try {
        var fn = window.Ember.Handlebars.precompile(source);
        callback(null, fn.toString());
      } catch (err) {
        callback(err, null)
      }
    }
  });
}

