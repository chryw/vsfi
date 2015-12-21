var gulp = require("gulp");
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now() / 1000);
var consolidate = require('gulp-consolidate');
var rename = require("gulp-rename");
var fontName = 'bowtie';
var svgsourcefolder = 'assets/icons/bowtie/1.2/';
var templateprefix = '_';

gulp.task('iconfont', function() {
  gulp.src([svgsourcefolder + '*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: 'templates/' + templateprefix + fontName + '.css',
      targetPath: '../../assets/css/' + fontName + '.css',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({fontName: fontName}))
    .on('glyphs', function(glyphs) {
      var options = {
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return {
            appendUnicode: true, // recommended option
            timestamp: runTimestamp, // recommended to get consistent builds when watching files
            name: glyph.name,
            codepoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase(),
            normalize: true,
            fontHeight: 5000,
          }
        }),
        fontName: fontName,
        fontPath: 'assets/fonts/', // set path to font (from your CSS file if relative)
        className: fontName, // set class name in your CSS
      };
      console.log(glyphs);
      gulp.src('templates/' + templateprefix + fontName + '.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest('.')); // set path to export your sample HTML
    })
    .pipe(gulp.dest('assets/fonts/')); // set path to export your fonts
});
