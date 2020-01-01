// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp'),
   browserSync = require("browser-sync").create(),
   sourcemaps = require('gulp-sourcemaps'),
   sass = require('gulp-sass'),
   concat = require('gulp-concat'),
   uglify = require('gulp-uglify'),
   postcss = require('gulp-postcss'),
   autoprefixer = require('autoprefixer'),
   cssnano = require('cssnano'),
   pug = require('gulp-pug');
var replace = require('gulp-replace');




// File paths
const files = { 
    scssPath: 'source/assets/scss/**/*.scss',
    jsPath: 'source/assets/js/*.js',
    pugPath: 'source/*.pug'
}




// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('public/assets/css'))
        .pipe(browserSync.stream());
     // put final CSS in public folder
}




// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('public/assets/js')
    );
}




// Pug task: converts pug files into html
function pugTask(){
  return src(files.pugPath)
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('public'))
    .pipe(browserSync.stream());
}




function reload(done) {
  browserSync.reload();
  done();
}




// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
  browserSync.init({
    server: {
        baseDir: "./public"
    },
    open: false,
    notify: false,
    directory: true
});
    watch([files.scssPath, files.jsPath, files.pugPath], 
        series(
            parallel(scssTask, jsTask, pugTask)
        )
    );    
}





// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask, pugTask),
    watchTask
);