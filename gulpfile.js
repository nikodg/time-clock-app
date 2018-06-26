"use strict";

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var cssModulesify = require('css-modulesify');
var uglify = require('gulp-uglify');
var pump = require('pump');
var clean = require('gulp-clean');
var path = require('path');
var envify = require('envify/custom');
var fs = require('fs');
var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        fonts: [
            'node_modules/bootstrap/dist/fonts/*',
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css',
            'node_modules/flatpickr/dist/flatpickr.min.css',
            './src/app.css'
        ],
        prodDist: './',
        prodDest: path.resolve(__dirname, '..', 'time-service/src/main/resources/static/'),
        dist: './dist',
        mainJs: './src/main.js'
    }
};

//Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('html-prod', function () {
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.prodDest));
});

gulp.task('fonts', function () {
    return gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.dist + '/fonts'))
        .pipe(connect.reload());
});
gulp.task('fonts-prod', function () {
    return gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.prodDest + '/fonts'));
});

gulp.task('js', function () {
    return browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('js-prod', function () {
    return browserify(config.paths.mainJs)
        .exclude('devApi')
        .transform(reactify)
        .transform(envify({
            NODE_ENV: process.env.NODE_ENV || 'dev'
        }))
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.prodDest + '/scripts'));
});

gulp.task('uglify', function (cb) {
    pump([
        gulp.src(config.paths.prodDist + '/scripts/bundle.js'),
        uglify(),
        gulp.dest(config.paths.dist + '/scripts')
    ], cb);
});

gulp.task('cleanProdDest', function (cb) {
    return gulp.src(config.paths.prodDest + '/fonts')
        .pipe(clean({ read: false, force: true }))
        .pipe(gulp.src(config.paths.prodDest + '/scripts'))
        .pipe(clean({ read: false, force: true }))
        .pipe(gulp.src(config.paths.prodDest + '/images'))
        .pipe(clean({ read: false, force: true }))
        .pipe(gulp.src(config.paths.prodDest + '/css'))
        .pipe(clean({ read: false, force: true }))
        .pipe(gulp.src(config.paths.prodDest + '/favicon.ico'))
        .pipe(clean({ read: false, force: true }))
        .pipe(gulp.src(config.paths.prodDest + '/index.html'))
        .pipe(clean({ read: false, force: true }))
        .end(cb);
});

gulp.task('cleanProdDist', function () {
    return gulp.src(config.paths.prodDist + '/scripts')
        .pipe(clean({ read: false }));
});

gulp.task('css', function () {
    return gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('css-prod', function () {
    return gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.prodDest + '/css'));
});

// Migrates images to dist folder
// Note that I could even optimize my images here
gulp.task('images', function () {
    return gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

});

gulp.task('images-prod', function () {
    return gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.prodDest + '/images'));
});


gulp.task('images-favicon', function () {
    return gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});


gulp.task('images-favicon-prod', function () {
    return gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.prodDest));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch('./src/app.css', ['css']);
});

gulp.task('create-config-dev', function (cb) {
    fs.writeFile(path.resolve(__dirname, 'src/constants/config.json'), JSON.stringify({
        env: {
            NODE_ENV: 'dev'
        }
    }), cb);
});
gulp.task('create-config-prod', function (cb) {
    fs.writeFile(path.resolve(__dirname, 'src/constants/config.json'), JSON.stringify({
        env: {
            NODE_ENV: 'prod'
        }
    }), cb);
});

gulp.task('dev', sequence('html', 'create-config-dev', 'js', 'css', 'images', 'images-favicon', 'fonts', 'lint', 'open', 'watch'));

gulp.task('default', sequence('lint', 'cleanProdDest', 'html-prod', 'create-config-prod', 'js-prod', 'uglify', 'cleanProdDist', 'css-prod', 'images-prod', 'images-favicon-prod', 'fonts-prod'));
