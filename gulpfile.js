'use strict'
// -------------------------------
// Define all required Node and Gulp packages
// -------------------------------
const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
let runTimestamp = Math.round(Date.now() / 1000);
const consolidate = require('gulp-consolidate');
const rename = require('gulp-rename');
const foreach = require('gulp-foreach');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const svgmin = require('gulp-svgmin');
const fs = require('fs');
const cheerio = require('gulp-cheerio');
const raster = require('gulp-raster');
const fontName = 'bowtie';

gulp.task('default', ['iconfont']);
//optimize all svg files by trimming whitespaces and empty tags
//Note: running this task will modify all svg files
//even if there is no more room to compress.
gulp.task('svgmin', function() {
    return gulp.src(['source/svgs/bowtie/*.svg'])
        .pipe(foreach((stream, file) => {
            return stream
                .pipe(svgmin())
                .pipe(concat(file.path))
        }))
        .pipe(gulp.dest(svgsourcefolder));
});

//export png
gulp.task('png', function() {
    let cheerioOptions = {
        run: function($) {
            //set width and height to prevent raster generating wrong dimensions
            $('svg')
                .attr({
                    width: 14,
                    height: 14
                });
            //set icons to be default color
            $('path')
                .attr({
                    fill: "#444444"
                });
            //added a transparent box to preserve padding
            $('path')
                .after('<rect fill="#fff" fill-opacity="0" width="448" height="448"/>');
        }
    };
    let png1x = gulp.src(['source/svgs/bowtie/*.svg'])
        .pipe(cheerio(cheerioOptions))
        .pipe(raster({
            format: 'png'
        }))
        .pipe(rename({
            extname: '.png'
        }))
        .pipe(gulp.dest('dist/png'));

    var png2x = gulp.src(['source/svgs/bowtie/*.svg'])
        .pipe(cheerio(cheerioOptions))
        .pipe(raster({
            format: 'png',
            scale: 2
        }))
        .pipe(rename({
            extname: '.png',
            suffix: '-2x'
        }))
        .pipe(gulp.dest('dist/png'));

    return merge(png1x, png2x);
});

//generate iconfont, stylesheet and demo page.
gulp.task('iconfont', function() {
    gulp.src(['source/svgs/bowtie/*.svg']) // the location of all the svg files to be created into the font
        .pipe(iconfont({
            normalize: true,
            fontHeight: 448,
            descent: 64,
            fontName: fontName,
            metadata: 'Icon font for VSTS.',
            version: 'v1.1',
            appendCodepoints: true,
            fontPath: '../../dist/fonts/',
            formats: ['ttf', 'eot', 'woff', 'svg']
        }))
        // automatically assign a unicode value to the icon
        .on('glyphs', function(glyphs) {
            let options = {
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
            gulp.src('source/templates/template_' + fontName + '.css') // a template css file, used to generate the css stylesheet
                .pipe(consolidate('lodash', options))
                .pipe(rename(fontName + '.css'))
                .pipe(gulp.dest('dist/css'));
            gulp.src('source/templates/template_' + fontName + '.html')
                .pipe(consolidate('lodash', options))
                .pipe(rename(fontName + '.html'))
                .pipe(gulp.dest('dist/'));
            // -------------------------------
            // END additional stuff to generate an scss file with all the font characters inside it
            // -------------------------------
        })
        .pipe(gulp.dest('dist/fonts')); // where to save the generated font files

    //copy metadata json file from source to dist
    gulp.src('source/' + fontName + '.json')
        .pipe(gulp.dest('dist'));
});
