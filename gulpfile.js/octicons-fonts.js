const gulp = require('gulp');
const iconfont = require('gulp-iconfont');

const octiconsOptions = {
    normalize: true,
    fontHeight: 512,
    descent: 64,
    fontName: 'Octicons',
    metadata: 'Octicons for VS Code',
    prependUnicode: true,
    formats: ['ttf', 'eot', 'woff', 'svg'],
    minsize: 16,
    maxsize: 512
};

//generate iconfont, stylesheet and demo page.
gulp.task('octicons-fonts', ['svgmin'], function() {
  return gulp.src(['source/octicons/*.svg']) // the location of all the svg files to be created into the font
      .pipe(iconfont(octiconsOptions))
      // automatically assign a unicode value to the icon
      .on('glyphs', function(glyphs) {
          let options = {
              glyphs: glyphs.map(function(glyph) {
                  // this line is needed because gulp-iconfont has changed the api from 2.0
                  return {
                      codepoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase(),
                      name: glyph.name
                  }
              })
          };
          glyphs.forEach(function(glyph, idx, arr) {
              arr[idx].glyph = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
          });
      })
      .pipe(gulp.dest('dist/octicons'));
});
