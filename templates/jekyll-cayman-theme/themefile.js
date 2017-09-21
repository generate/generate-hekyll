/**
 * "camen" theme - custom build logic
 */

module.exports = function(app) {
  var paths = app.options.paths;

  app.task('css', function() {
    return app.copy(paths.src('css/**'), paths.dest('css'));
  });

  app.task('custom', ['css']);
};
