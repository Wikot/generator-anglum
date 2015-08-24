var gulp = require('gulp');
var wiredep = require('wiredep');
var gutil = require('gulp-util');
var prompt = require('gulp-prompt');
var useref = require('gulp-useref');

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

gulp.task('url', function(){
  var source = gulp.src('./frontend/index.html');
  return gulp.src('./frontend/index.html')
    .pipe(prompt.prompt({
        type: 'input',
        name: 'urlbase',
        message: 'Please insert the base Url for the project (i.e. http://localhost:8080/this-is-your/base/url/)',
        default: '/'
      },
      function(res){

        gulp.src('./frontend/index.html')
        .pipe(useref({
          urlbase: function (content, target, options, alternateSearchPath) {
            return '<!-- build:urlbase --><base href="'+res.urlbase+'" /><!-- endbuild -->';
          }
        }))
        .pipe(gulp.dest('./frontend'));

      }));
});
