const gulp = require('gulp');
const iconfont = require('gulp-iconfont');

const iconFontOptions = {
    normalize: true,
    fontHeight: 448,
    descent: 64,
    fontName: 'Bowtie',
    metadata: 'Bowtie icon font for VSTS.',
    appendCodepoints: true,
    formats: ['ttf', 'eot', 'woff', 'svg'],
    minsize: 14,
    maxsize: 448
};

//generate iconfont, stylesheet and demo page.
gulp.task('iconfont', ['svgmin'], function() {
    return gulp.src(['source/svgs/*.svg']) // the location of all the svg files to be created into the font
        .pipe(iconfont(iconFontOptions))
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
        .pipe(gulp.dest('dist')); // where to save the generated font files
});
