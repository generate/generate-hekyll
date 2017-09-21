'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('matched');

function expand() {
  var cwd = path.join(__dirname, '..');
  var files = glob.sync('types/*.js', {cwd: cwd});
  var len = files.length;
  var idx = -1;
  var res = {projects: [], files: {}};
  while (++idx < len) {
    var name = files[idx];
    var ext = path.extname(name);
    var stem = path.basename(name, ext);
    var obj = data(stem);
    res.projects.push(obj);
    res.files[obj.name] = {
      'index.js': fs.readFileSync(path.join(cwd, name))
    };
  }

  return res;
}

function data(name) {
  return {
    name: `enquirer-${name}`,
    alias: name.charAt(0).toUpperCase() + name.slice(1)
  };
}

/**
 * Expose `expand`
 */

module.exports = expand;
