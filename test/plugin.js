'use strict';

require('mocha');
var assert = require('assert');
var generate = require('generate');
var generator = require('..');
var app;

describe('generate-hekyll', function() {
  beforeEach(function() {
    app = generate();
  });

  describe('plugin', function() {
    it('should add tasks to the instance', function() {
      app.use(generator);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('hekyll'));
    });

    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'generate-hekyll') {
          count++;
        }
      });
      app.use(generator);
      app.use(generator);
      app.use(generator);
      assert.equal(count, 1);
      cb();
    });
  });
});
