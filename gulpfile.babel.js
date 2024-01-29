import { src, dest, parallel, series, watch } from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import concat from 'gulp-concat';    
const transpileSass = gulpSass(nodeSass);



const path = {
  src: './src/*',
  dist: './dist',
  js: './src/*.js',
  css: './dist/coloris.css',
  scss: './src/*.scss'
};

function minifyJS() {
  return src(path.js)
    .pipe(babel({ retainLines: true }))
    .pipe(replace('"use strict";', ''))
    // Output the non-minified version
    .pipe(dest(path.dist))
    // Minify and rename to *.min.js
    .pipe(uglify({
      output: {
        comments: /^!/
      }
    }))
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(dest(path.dist));
}

function minifyCSS() {
  return src(path.css)
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(dest(path.dist));
}

function watchFiles() {
  watch(path.js, minifyJS);
  watch(path.scss, parallel(transpileSCSS));
  watch(path.css, parallel(minifyCSS));
}

function transpileSCSS() {
  return src(path.scss)
    .pipe(transpileSass().on('error', transpileSass.logError))
    .pipe(concat('coloris.css'))
    .pipe(dest(path.dist));
}

export const build = parallel(minifyJS, transpileSCSS, minifyCSS);

export default series(build, watchFiles);


