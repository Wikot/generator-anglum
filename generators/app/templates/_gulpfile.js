var gulp = require('gulp');
var wiredep = require('wiredep');

gulp.task('default', function() {
  // place code for your default task here
});


gulp.task('wiredep', function () {

  gulp.src('./frontend/index.html')
    .pipe(wiredep.stream({
      directory: './frontend/lib/',
      bowerJson: require('./bower.json'),
    }))
    .pipe(gulp.dest('./frontend'));

});


