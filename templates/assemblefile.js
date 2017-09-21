'use strict';

var argv = require('minimist')(process.argv.slice(2));
var hekyll = require('assemble-hekyll');
var assemble = require('assemble');

/**
 * Instantiate assemble
 */

var app = module.exports = assemble(argv);

/**
 * Register hekyll plugin
 */

app.use(hekyll({cwd: path.join(__dirname, 'src')}));

/**
 * Default task
 */

app.task('default', ['theme']);
