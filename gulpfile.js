// --------------------
// #GULP
// --------------------
'use strict';

// package vars
const pkg = require("./package.json");

// gulp
const gulp = require('gulp');

// critical
const critical = require('critical').stream;

// clean cSS
const cleanCSS = require('gulp-clean-css');

// css
const cssnano = require('cssnano');

// pump
const pump = require('pump');

// BrowserSync
const browserSync   = require('browser-sync').create();

// inline css
const inlinesource = require('gulp-inline-source');

// load all plugins in "devDependencies" into the variable $
const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});

const onError = (err) => {
    console.log(err);
};




// Configure paths
var config = {
    bourbonDir: './bower_components/bourbon/app/assets/stylesheets',
    neatDir:    './bower_components/neat/app/assets/stylesheets',
}



const versionConfig = {
  'value': '%DT%',
  'append': {
    'key': 'v',
    'to': ['css'],
  },
};




const banner = [
    "/**",
    " * @project        <%= pkg.name %>",
    " * @author         <%= pkg.author %>",
    " * @build          " + $.moment().format("llll") + " ET",
    " * @release        " + $.gitRevSync.long() + " [" + $.gitRevSync.branch() + "]",
    " * @copyright      Copyright (c) " + $.moment().format("YYYY") + ", <%= pkg.copyright %>",
    " *",
    " */",
    ""
].join("\n");





/**
 * Compile SCSS
 */
 gulp.task('styles', () => {
    $.fancyLog("-> Compiling scss");
    return gulp.src(pkg.paths.source.scss)
        .pipe($.sass({
            includePaths: [config.bourbonDir, config.neatDir],
        })
            .on("error", $.sass.logError)
        )
        .pipe($.cached("sass_compile"))
        //.pipe(concat('styles.css'))
        .pipe(cleanCSS({
             level: {
             1: {},
             2: {}
             }
        }))
        .pipe($.postcss(cssnano))
        .pipe($.autoprefixer({
          remove: false,
          browsers: ['last 3 versions']
      }))
        //.pipe($.gzip())
        .pipe($.header(banner, {pkg: pkg}))
        .pipe(browserSync.reload({stream:true}))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.public.css));
 });




/**
 * Compile jade files into HTML
 */
 gulp.task('jade', () => {
    $.fancyLog("-> Compiling jade");
    return gulp.src(pkg.paths.source.jade , {since: gulp.lastRun('jade')})
        .pipe($.plumber())
        .pipe($.jade({
            pretty: true
        }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(pkg.paths.public.base));
});





/**
 * Combine JS
 */
 gulp.task('js', (cb) => {
    $.fancyLog("-> Building js");
    pump([
        gulp.src(pkg.paths.source.js + '/**/*.js'),
        $.plumber(),
        $.uglify(),
        //$.concat('all.js'),
        //$.gzip(),
        browserSync.reload({ stream: true }),
        gulp.dest(pkg.paths.public.js)
    ],
    cb
  );
});




/**
 * Watch
 */
gulp.task('watch', () => {
    gulp.watch(pkg.paths.source.scssPath + '/**/*.scss', gulp.series('styles'));
    gulp.watch(pkg.paths.source.base + '/**/*.jade', gulp.series('jade'));
    gulp.watch(pkg.paths.source.js + '/**/*.js', gulp.series('js'));
    gulp.watch('./public/**/*.*').on('change', browserSync.reload);
});





/**
 * BrowserSync
 */
gulp.task('serve', () => {
    browserSync.init({
        server: {
            'middleware': [
                function (req, res, next) {
                    if(req._parsedUrl.pathname.match(/\.gz$/g)){
                      res.setHeader('Content-Type', 'text/html');
                      res.setHeader('Content-Encoding', 'gzip');
                    }
                    next();
                }
            ],
            baseDir: "./public"
        },
        notify: false,
        directory: true
    });
});





/**
 * Build
 */
gulp.task('build', gulp.series( 'styles', 'jade', 'js'));





/**
 * Run gulp
 */
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));