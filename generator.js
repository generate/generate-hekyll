'use strict';

var path = require('path');
var del = require('delete');
var clone = require('gh-clone');
var hekyll = require('hekyll');
var DataStore = require('data-store');
var writeJson = require('write-json');
var isValid = require('is-valid-app');
var prompts = require('./prompts');

/**
 * generate-hekyll
 */

module.exports = function(app) {
  if (!isValid(app, 'generate-hekyll')) return;

  app.on('error', console.log.bind(console));
  app.task('noop', function() {});

  /**
   * Defaults
   */

  var store = new DataStore({path: path.join(__dirname, 'themes.json')});
  var themes = path.resolve.bind(path, __dirname, 'themes');
  var dest = path.resolve.bind(path, app.cwd, 'src');
  var state = { themes: themes, dest: dest };
  var enquirer = app.enquirer = prompts(app, store, state);

  /**
   * Register plugins
   */

  app.use(require('generate-defaults'));
  app.use(require('generate-package'));

  /**
   * Scaffold out a new handlebars blog or site from a jekyll theme.
   *
   * ```sh
   * $ gen hekyll
   * $ gen hekyll:default
   * ```
   * @name default
   * @api public
   */

  app.task('default', ['hekyll']);
  app.task('hekyll', function() {
    return enquirer.prompt('theme')
      .then(task('prompt-clone'))
      .then(task('clone'))
      .then(task('prompt-color'))
      .then(task('convert-to-handlebars'));
  });

  /**
   * Prompt for the color to use. Only runs if an applicable theme
   * was chosen by the user.
   *
   * ```sh
   * $ gen hekyll:prompt-color
   * ```
   * @name prompt-color
   */

  app.task('prompt-color', function(cb) {
    return enquirer.prompt('color');
  });

  /**
   * Prompt the user to clone a theme repository from GitHub.
   *
   * ```sh
   * $ gen hekyll:prompt-clone
   * ```
   * @name prompt-clone
   */

  app.task('prompt-clone', function() {
    return enquirer.prompt('clone');
  });

  /**
   * Clone a theme repository from GitHub, if specified by the user.
   *
   * ```sh
   * $ gen hekyll:clone
   * ```
   * @name clone
   */

  app.task('clone', function() {
    if (!state.exists()) {
      return clone({dest: themes(state.theme), repo: state.repo});
    }
    return Promise.resolve(null);
  });

  /**
   * Convert Jekyll theme to handlebars
   */

  app.task('convert-to-handlebars', [
    'hekyll-build',
    'theme-json',
    'theme-custom',
    'prompt-assemblefile'
  ]);

  /**
   * Run [hekyll][]'s `.build` method with the given theme
   * and destination directory.
   *
   * ```sh
   * $ gen hekyll:hekyll-build
   * ```
   * @name default
   */

  app.task('hekyll-build', function() {
    return hekyll.build({cwd: themes(state.theme), destBase: dest()});
  });

  /**
   * Get `theme.json` config file, if one exists for the chosen theme.
   */

  app.task('theme-json', function(cb) {
    return writeJson(dest('_data/theme.json'), state);
  });

  /**
   * Get custom `themefile.js`, if one exists for the chosen theme.
   */

  app.task('theme-custom', function(cb) {
    var patterns = ['templates/themefile.js', `templates/${state.theme}/*.js`];
    return app.src(patterns, {cwd: __dirname})
      .pipe(app.dest(dest()));
  });

  /**
   * Prompt the user to generate an `assemblefile.js`.
   *
   * ```sh
   * $ gen hekyll:prompt-assemblefile
   * ```
   * @name prompt-assemblefile
   */

  app.task('prompt-assemblefile', function() {
    return enquirer.prompt('assemblefile');
  });

  /**
   * Generate an assemblefile.js to the current working directory.
   */

  app.task('assemblefile', function(cb) {
    return app.src('templates/assemblefile.js', {cwd: __dirname})
      .pipe(app.dest(dest()));
  });

  /**
   * Delete themes that have been cloned and cached by `generate-hekyll`
   * from the `generate-hekyll/themes` directory. This does not delete
   * your copy of the theme, only the cached version used by `generate-hekyll`.
   *
   * ```sh
   * $ gen hekyll:delete
   * ```
   * @name delete
   * @api public
   */

  app.task('delete', function(cb) {
    store.del('choices');
    return del(path.resolve(__dirname, 'themes'));
  });

  /**
   * For unit tests
   */

  app.task('hekyll-test', function(cb) {
    app.enable('hekyll-test');
    cb();
  });

  function task(name) {
    return function() {
      return new Promise(function(resolve, reject) {
        app.build(name, function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    };
  }
};
