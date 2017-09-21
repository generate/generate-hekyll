'use strict';

var fs = require('fs');
var path = require('path');
var Enquirer = require('enquirer');
var Confirm = require('prompt-confirm');

module.exports = function(app, store, state) {
  var enquirer = new Enquirer();
  var clone = promisify(require('gh-clone'));
  var writeFile = promisify(fs.writeFile);
  var template = path.join.bind(path, __dirname, 'templates');

  state.exists = function() {
    return fs.existsSync(state.path);
  };

  /**
   * Register prompts
   */

  enquirer.register('confirm', require('prompt-confirm'));
  enquirer.register('radio', require('prompt-radio'));

  /**
   * Default choices
   */

  store.union('choices', [
    'none',
    'pages-themes/architect',
    'pages-themes/cayman',
    'pages-themes/dinky',
    'pages-themes/hacker',
    'pages-themes/leap-day',
    'pages-themes/merlot',
    'pages-themes/midnight',
    'pages-themes/minimal',
    'pages-themes/modernist',
    'pages-themes/slate',
    'pages-themes/tactile',
    'pages-themes/time-machine',
    'pietromenna/jekyll-cayman-theme',
    'poole/hyde',
    'poole/lanyon',
    'poole/poole',
    'other'
  ]);

  /**
   * Get the theme to generate
   */

  enquirer.question('theme', {
    type: 'radio',
    message: 'Which theme? (choose "other" to specify any GitHub repository)',
    default: store.get('default'),
    choices: store.get('choices'),
    when: function() {
      return !state.theme;
    },
    transform: function(repo) {
      update(repo);
      return repo;
    }
  });

  /**
   * Get the color to use for the specified theme
   */

  enquirer.question('color', {
    type: 'radio',
    message: 'Theme color?',
    default: store.get('color') || 'default',
    choices: [
      {value: 'default', name: 'default'},
      {value: 'red', name: 'theme-base-08'},
      {value: 'orange', name: 'theme-base-09'},
      {value: 'yellow', name: 'theme-base-0a'},
      {value: 'green', name: 'theme-base-0b'},
      {value: 'sea-green', name: 'theme-base-0c'},
      {value: 'blue', name: 'theme-base-0d'},
      {value: 'purple', name: 'theme-base-0e'},
      {value: 'brown', name: 'theme-base-0f'}
    ],
    when: function() {
      return /poole/.test(state.repo) && !state.color;
    },
    transform: function(color) {
      state.bodyClass = color;
      store.set('color', color);
      state.color = color;
      return color;
    }
  });

  /**
   * Get the theme to generate
   */

  enquirer.question('clone', {
    type: 'input',
    message: 'GitHub repo to clone? (owner/name)',
    when: function() {
      return state.theme === 'other';
    },
    transform: function(repo) {
      if (repo) update(repo);
      if (repo && !state.exists()) {
        return clone({dest: state.themes(state.theme), repo: repo});
      }
    }
  });

  /**
   * Generate an assemblefile.js
   */

  enquirer.question('assemblefile', {
    type: 'confirm',
    message: 'Want to add an assemblefile.js to build the theme?',
    default: true,
    when: function() {
      return !fs.existsSync(path.join(app.cwd, 'assemblefile.js'));
    },
    transform: function(write) {
      if (write) {
        var dest = path.join(app.cwd, 'assemblefile.js');
        var src = fs.readFileSync(template('assemblefile.js'));
        return writeFile(dest, src)
          .then(function() {
            return new Promise(function(resolve, reject) {
              app.generate(['package', 'install'], function(err) {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
          });
      }
    }
  });

  app.task('install', function(cb) {
    app.npm.devDependencies(['assemble', 'assemble-hekyll', 'minimist'], cb);
  });

  function update(repo) {
    state.repo = repo;
    state.theme = path.basename(repo);
    state.path = state.themes(state.theme);
    store.union('choices', state.repo);
    store.set('default', state.repo);
  }

  return enquirer;
};

/**
 * Convert the given async function to a promise
 */

function promisify(fn) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      return fn.apply(null, args.concat(function(err, ...rest) {
        if (err) {
          reject(err);
        } else {
          resolve(...rest);
        }
      }));
    });
  };
}
