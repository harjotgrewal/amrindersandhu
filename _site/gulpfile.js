var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass')(require('sass'));
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var pug        = require('gulp-jade');
var inlinesource = require('gulp-inline-source');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'pug', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/styles.scss')
        .pipe(sass({
            includePaths: ['scss']
        }).on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

/**
 * Compile files from _jadefiles
 */
gulp.task('pug', function () {
    return gulp.src('_jadefiles/*.pug')
        .pipe(pug({
            pretty: true
        }))        
        .pipe(gulp.dest('_includes'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', () => {   
    return gulp.src('_site/*.html')      
        .pipe(inlinesource())        
        .pipe(gulp.dest('_site/'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*', 'assets/js/*.js'], ['jekyll-rebuild']);
    gulp.watch('_jadefiles/*.pug', ['pug']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
