// preprocessor.js
var ReactTools = require('react-tools');
module.exports = {
  process: function(src, path) {
    if(!path.match(/\.js/)) {
      var fileName = path.match(/[^\/]+\.[^\/]+$/);
      console.log("File " + fileName + " is not javascript, skipping.\n\tPath:" + path);
      return "";
    }

    return ReactTools.transform(src);
  }
};