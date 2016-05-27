// -------------------------------
// Define all required Node and Gulp packages
// -------------------------------
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now() / 1000);
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var foreach = require('gulp-foreach');
var concat = require('gulp-concat');
var svgmin = require('gulp-svgmin');
var fs = require('fs');
var fontName = 'bowtie';
var svgsourcefolder = 'source/svgs/bowtie/';


//optimize all svg files by trimming whitespaces and empty tags
//Note: running this task will modify all svg files
//even if there is no more room to compress.
gulp.task('svgmin',function(){
	return gulp.src([svgsourcefolder + '*.svg'])
	.pipe(foreach(function(stream,file){
		return stream
		.pipe(svgmin())
		.pipe(concat(file.path))
	}))
	.pipe(gulp.dest(svgsourcefolder));
});

//generate iconfont, stylesheet and demo page.
gulp.task('iconfont', function() {
	gulp.src([svgsourcefolder + '*.svg']) // the location of all the svg files to be created into the font
		.pipe(iconfont({
			normalize: true,
			fontHeight: 448,
			descent:    64,
			fontName: fontName,
			metadata: 'Icon font for VSTS.',
			version: 'v1.1',
			appendCodepoints: true,
      fontPath: '../../dist/fonts/',
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
      console.log(glyphs);
			glyphs.forEach(function(glyph, idx, arr) {
				arr[idx].glyph = glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()
			});
			gulp.src('source/templates/template_'+ fontName + '.css') // a template css file, used to generate the css stylesheet
				.pipe(consolidate('lodash', options))
				.pipe(rename(fontName + '.css'))
				.pipe(gulp.dest('dist/css'));
			gulp.src('source/templates/template_'+ fontName + '.html')
				.pipe(consolidate('lodash', options))
				.pipe(rename(fontName + '.html'))
				.pipe(gulp.dest('dist/'));
			// -------------------------------
			// END additional stuff to generate an scss file with all the font characters inside it
			// -------------------------------
		})
		.pipe(gulp.dest('dist/fonts')); // where to save the generated font files

		//copy metadata json file from source to dist
		gulp.src('source/'+ fontName + '.json')
		.pipe(gulp.dest('dist'));
});
