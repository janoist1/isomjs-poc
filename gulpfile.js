'use strict';

// load deps
var browserify = require('browserify'),
    express = require('gulp-express'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    stringify = require('stringify'),
    through2 = require('through2');


// some config
var clientScriptPath = './src/client.js';
var serverScriptPath = './src/server.js';


/**
 * express web server task - the isomorphic way
 * - depends on the build task
 */
gulp.task('server', ['build'], function () {
    express.run([serverScriptPath]);

    //// Restart the server when file changes
    //gulp.watch(['app/**/*.html'], server.notify);
    //gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
    ////gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]);
    ////Event object won't pass down to gulp.watch's callback if there's more than one of them.
    ////So the correct way to use server.notify is as following:
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], function(event){
    //    gulp.run('styles:css');
    //    server.notify(event);
    //    //pipe support is added for server.notify since v0.1.5,
    //    //see https://github.com/gimm/gulp-express#servernotifyevent
    //});

    //gulp.watch(['app/images/**/*'], server.notify);
    //gulp.watch([serverScriptPath, 'routes/**/*.js'], [server.run]);

    function restart() {
        //console.log('reloaded ' + (new Date().toLocaleTimeString().toString()));
        express.run([serverScriptPath]);
    }

    gulp.watch(['./src/**/*.js'], ['build', restart]);
});

/**
 * build
 */
gulp.task('build', ['browserify'], function () {
});

/**
 * bundle stuff together in order to use 'require' on the client side
 */
gulp.task('browserify', function () {
    gulp.src(clientScriptPath)
        // we need through2 because of some stream mismatch issue
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path)
                .transform(stringify(['.hbs', '.html']))
                //.transform('stringify')
                .bundle(function (err, res) {
                    if (err) console.log(err);
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./public/js'))
});

/**
 * web server task - the oldschool way - can be removed
 */
//gulp.task('server', ['browserify'], function () {
//    gulp.src('./public/')
//        .pipe(webserver({
//            host: '0.0.0.0',
//            livereload: true,
//            directoryListing: false,
//            fallback: 'index.html',
//            open: true
//        }));
//
//    gulp.watch(['./src/**/*.js'], ['browserify']);
//});
