const concat = require('gulp-concat');
const foreach = require('gulp-foreach');
const gulp = require('gulp');
const svgmin = require('gulp-svgmin');

//optimize all svg files by trimming whitespaces and empty tags
//Note: running this task will modify all svg files
//even if there is no more room to compress.
gulp.task('svgmin', function() {
    return gulp.src(['source/svgs/*.svg'])
        .pipe(foreach((stream, file) => {
            return stream
                .pipe(svgmin())
                .pipe(concat(file.path))
        }))
        .pipe(gulp.dest('source/svgs/'));
});
