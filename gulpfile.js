var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');

gulp.task('default', function () {
    return gulp.src('templates/**/*.html')
        .pipe(templateCache({
            module: 'spFormsTemplates',
            standalone: true
        }))
        .pipe(gulp.dest('public'));
});