'use strict';

var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
openURL = require('openurl'),
runSequence = require('run-sequence'),
cssComb = require('gulp-csscomb'),
cssBeautify = require('gulp-cssbeautify'),
cssCombLint = require('gulp-csscomb-lint'),
jsValidate = require('gulp-jsvalidate'),
gls = require('gulp-live-server');

var appName = "kimolecula"

var appPaths = {
    debug: 'dev/',
    production: 'dist/'
};

var appServer = {
    folder: appPaths.production,
    port: 8000
}

var filesPaths = {
    code: {
        src: appPaths.debug + 'js/**/*.js',
        dest: appPaths.production + 'js',
        debug: appPaths.debug + 'js/**',
        production: appPaths.production + 'js/' + appName + '.min.js'
    },
    styles: {
        src: appPaths.debug + 'less/' + appName + '.less',
        dest: appPaths.production + 'css',
        debug: appPaths.debug + 'less/*.less',
        production: appPaths.production + 'css/' + appName + '.min.css'
    },
    templates: {
        src: appPaths.debug + 'templates/**/*.html',
        dest: appPaths.production + 'templates',
        debug: appPaths.debug + 'templates/index.html',
        production: appPaths.production + 'templates'
    },
    libs: {
        src: appPaths.debug + 'libs/**',
        dest: appPaths.production + 'libs',
        debug: appPaths.debug + 'libs/**',
        production: appPaths.production + 'libs/**'
    },
    images: {
        src: appPaths.debug + 'design/**',
        dest: appPaths.production + 'design',
        debug: appPaths.debug + 'design/**',
        production: appPaths.production + 'design/**'
    },
    extras: {
        levels: {
            src: appPaths.debug + 'levels/**/**',
            dest: appPaths.production + 'lelvels'
        },
        languages: {
            src: appPaths.debug + 'l20n/**/**',
            dest: appPaths.production + 'l20n'
        },
        css: {
            src: appPaths.debug + 'css/**/**',
            dest: appPaths.production + 'css'
        }
    }
};

var htmlPattern = [filesPaths.templates.src, '!' + filesPaths.templates.debug];
var server = gls.static(appServer.folder, appServer.port);






///////////
// SERVE //
///////////
gulp.task('serve', function (cb) {
    runSequence(['start:server'], cb);
});

gulp.task('start:server', function(done) {
    server.start();
    openURL.open('http://localhost:' + appServer.port);

    gulp.watch([filesPaths.templates.src], function (file) {
        runSequence('copy:templates');

        gulp.watch([filesPaths.templates.production], function (file) {
            server.notify.apply(server, [file]);
        });
    });

    gulp.watch([filesPaths.styles.debug], function (file) {
        runSequence('make:less');

        gulp.watch([filesPaths.styles.production], function (file) {
            server.notify.apply(server, [file]);
        });
    });

    gulp.watch([filesPaths.code.debug], function (file) {
        runSequence('make:js');

        gulp.watch([filesPaths.code.production], function (file) {
            server.notify.apply(server, [file]);
        });
    });

    gulp.watch([filesPaths.images.debug], function (file) {
        runSequence('copy:design');

        gulp.watch([filesPaths.images.production], function (file) {
            server.notify.apply(server, [file]);
        });
    });

    gulp.watch([filesPaths.images.debug], function (file) {
        runSequence('copy:design');

        gulp.watch([filesPaths.images.production], function (file) {
            server.notify.apply(server, [file]);
        });
    });

    gulp.watch([filesPaths.extras.languages.src], function (file) {
        runSequence('copy:languages');

        gulp.watch([filesPaths.extras.languages.dest], function (file) {
            server.notify.apply(server, [file]);
        });
    });

    gulp.watch([filesPaths.extras.css.src], function (file) {
        runSequence('copy:css');

        gulp.watch([filesPaths.extras.css.dest], function (file) {
            server.notify.apply(server, [file]);
        });
    });

    if (filesPaths.libs.debug) {
        gulp.watch([filesPaths.libs.debug], function (file) {
            runSequence('copy:libs');

            gulp.watch([filesPaths.libs.production], function (file) {
                server.notify.apply(server, [file]);
            });
        });
    }
});

gulp.task('server:reload', function (file) {
    server.notify.apply(server, [file]);
});





///////////
// TASKS //
///////////
gulp.task('make:less', function() {
    return gulp.src(filesPaths.styles.src)
    .pipe($.less())
    .pipe($.concatCss(appName + '.css'))
    .pipe(cssComb())
    .pipe(cssBeautify({
        indent: '  ',
        openbrace: 'end-of-line',
        autosemicolon: true
    }))
    .pipe($.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe($.cleanCss({
        compatibility: 'ie8',
        keepSpecialComments: 0
    }))
    .pipe($.rename(function (path) {
        path.basename += '.min';
    }))
    .pipe(cssCombLint())
    .pipe(gulp.dest(filesPaths.styles.dest));
});

gulp.task('make:js', function () {
    return gulp.src(filesPaths.code.src)
    .pipe($.concat(appName + '.js'))
    .pipe(jsValidate())
    .pipe($.minify({
        ext:{
            min:'.min.js'
        },
        noSource: true,
        preserveComments: ['some'],
        mangle: false
    }))
    .pipe(gulp.dest(filesPaths.code.dest));
});

gulp.task('copy:design', function () {
    return gulp.src(filesPaths.images.src)
    .pipe(gulp.dest(filesPaths.images.dest));
});

gulp.task('copy:libs', function () {
    return gulp.src(filesPaths.libs.src)
    .pipe($.minify({
        ext:{
            min:'.min.js'
        },
        noSource: true,
        preserveComments: ['some'],
        mangle: false
    }))
    .pipe(gulp.dest(filesPaths.libs.dest));
});

gulp.task('copy:templates', function () {
    gulp.src(htmlPattern)
    .pipe(gulp.dest(filesPaths.templates.production))
    gulp.src(filesPaths.templates.debug)
    .pipe(gulp.dest(appPaths.production));
});

gulp.task('copy:css', function () {
    return gulp.src(filesPaths.extras.css.src)
    .pipe(gulp.dest(filesPaths.extras.css.dest));
});

gulp.task('copy:levels', function () {
    return gulp.src(filesPaths.extras.levels.src)
    .pipe(gulp.dest(filesPaths.extras.levels.dest));
});

gulp.task('copy:languages', function () {
    return gulp.src(filesPaths.extras.languages.src)
    .pipe(gulp.dest(filesPaths.extras.languages.dest));
});



///////////
// BUILD //
///////////
gulp.task('default', ['build']);

gulp.task('build', function () {
    runSequence('make:js', 'make:less', 'copy:design', 'copy:libs', 'copy:templates', 'copy:extras');
});

gulp.task('copy:extras', function () {
    runSequence('copy:levels', 'copy:languages', 'copy:css');
});
