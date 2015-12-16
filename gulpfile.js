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
    start();

    function start() {
        express.run([serverScriptPath]);
    }

    gulp.watch(['./src/**/*.js'], ['build', start]);
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
                .bundle(function (err, res) {
                    if (err) console.log(err);
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./public/js'))
});
