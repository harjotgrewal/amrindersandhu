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
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/*.js',
    jadePath: 'app/*.jade'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
     // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}

// Jade task: converts jade files into html
function pugTask(){
  return src(files.jadePath)
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('dist'))
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
    options: {
      server: {
          baseDir: "./dist"
      }
  }
  });
    watch([files.scssPath, files.jsPath, files.jadePath], 
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