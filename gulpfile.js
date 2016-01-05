// -------------------------------
// Define all required Node and Gulp packages
// -------------------------------
var gulp = require("gulp");
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now() / 1000);
var consolidate = require('gulp-consolidate');
var rename = require("gulp-rename");
var fontName = 'bowtie';
var svgsourcefolder = 'assets/icons/bowtie/1.22/';

gulp.task('iconfont', function() {
	gulp.src([svgsourcefolder + '*.svg']) // the location of all the svg files to be created into the font
		.pipe(iconfont({
			normalize: true,
			descent: 0,
			fontName: fontName,
			appendCodepoints: true,
      fontPath: '../fonts/',
			formats: ['ttf', 'eot', 'woff', 'svg']
		}))
		// automatically assign a unicode value to the icon
		.on('glyphs', function(glyphs) {
			var options = {
				fontName: fontName,
				fontPath: '../fonts/', // set path to font (from your CSS file if relative)
				className: fontName, // set class name in your CSS
				glyphs: glyphs.map(function(glyph) {
					// this line is needed because gulp-iconfont has changed the api from 2.0
					return {
						codepoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase(),
						name: glyph.name
					}
				})
			};
			console.log(options);
      console.log(glyphs);
			glyphs.forEach(function(glyph, idx, arr) {
				arr[idx].glyph = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
			});
			gulp.src('templates/template.css') // a template css file, used to generate the css stylesheet
				.pipe(consolidate('lodash', options))
				.pipe(rename(fontName + '.css'))
				.pipe(gulp.dest('assets/css'));
			gulp.src('templates/template.html')
				.pipe(consolidate('lodash', options))
				.pipe(rename(fontName + '.html'))
				.pipe(gulp.dest('.'));
			// -------------------------------
			// END additional stuff to generate an scss file with all the font characters inside it
			// -------------------------------
		})
		.pipe(gulp.dest('assets/fonts')); // where to save the generated font files
});
