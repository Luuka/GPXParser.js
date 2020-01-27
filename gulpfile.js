var gulp = require('gulp'),
    minify = require('gulp-minify'),
    jsdoc = require('gulp-jsdoc3'),
    mocha = require('gulp-mocha');

gulp.task('test', function() {
    return gulp.src('./test/test.js', {read: false}).pipe(mocha({reporter: 'nyan'}))
});

gulp.task('minify', function(){
    return gulp.src('./src/GPXParser.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        noSource: true
      }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('doc', function (cb) {
    var config = require('./jsdoc.json');

    return gulp.src(['README.md', './src/GPXParser.js'], {read: false}).pipe(jsdoc(config, cb));
});

gulp.task('build', gulp.series('test', 'minify', 'doc'));