module.exports = function(app) {
  app.task('custom', {silent: true}, function(cb) {
    cb();
  });
};
