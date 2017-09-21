'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var isValid = require('is-valid-app');
var npm = require('npm-install-global');
var del = require('delete');
var pkg = require('../package');
var generator = require('..');
var isTravis = process.env.CI || process.env.TRAVIS;
var app;

var cwd = path.resolve.bind(path, process.cwd());
var tests = path.resolve.bind(path, __dirname);
var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  return function(err) {
    if (err) return cb(err);
    fs.stat(actual(name), function(err, stat) {
      if (err) return cb(err);
      del(actual(), cb);
    });
  };
}

describe('generate-hekyll', function() {
  this.slow(350);

  if (!process.env.CI && !process.env.TRAVIS) {
    before(function(cb) {
      this.timeout(10000);
      npm.maybeInstall('generate', cb);
    });
  }

  before(function() {
    return del(actual());
  });

  after(function() {
    return del(actual());
  });

  beforeEach(function() {
    app = generate();
    app.cwd = actual();

    app.option({
      cwd: actual(),
      dest: actual(),
      theme: 'poole',
      color: 'red'
    });
  });

  describe.only('tasks', function() {
    it('should extend tasks onto the instance', function() {
      app.use(generator);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('hekyll-test'));
    });

    it('should run the `default` task with .build', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.use(generator);
      app.build('hekyll', exists('src/LICENSE.md', cb));
    });

    it('should run the `default` task with .generate', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.use(generator);
      app.generate('default', exists('src/LICENSE.md', cb));
    });
  });

  describe('generator (CLI)', function() {
    it('should run the default task using the `generate-hekyll` name', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.generate('generate-hekyll', exists('src/LICENSE.md', cb));
    });

    it('should run the default task using the `hekyll` generator alias', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.generate('hekyll', exists('src/LICENSE.md', cb));
    });
  });

  describe('generator (API)', function() {
    it('should run the default task on the generator', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.register('hekyll', generator);
      app.generate('hekyll', exists('src/LICENSE.md', cb));
    });

    it.only('should run the `default` task when defined explicitly', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.register('hekyll', generator);
      app.generate('hekyll:default', exists('src/LICENSE.md', cb));
    });
  });

  describe('sub-generator', function() {
    it('should work as a sub-generator', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.register('foo', function(foo) {
        foo.register('hekyll', generator);
      });
      app.generate('foo.hekyll', exists('src/LICENSE.md', cb));
    });

    it('should run the `default` task by default', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.register('foo', function(foo) {
        foo.register('hekyll', generator);
      });
      app.generate('foo.hekyll', exists('src/LICENSE.md', cb));
    });

    it('should run the `hekyll:default` task when defined explicitly', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }
      app.register('foo', function(foo) {
        foo.register('hekyll', generator);
      });
      app.generate('foo.hekyll:default', exists('src/LICENSE.md', cb));
    });

    it('should work with nested sub-generators', function(cb) {
      if (isTravis) {
        this.skip();
        return;
      }

      app
        .register('foo', function() {})
        .register('bar', function() {})
        .register('baz', generator);

      app.generate('foo.bar.baz', exists('src/LICENSE.md', cb));
    });
  });
});
