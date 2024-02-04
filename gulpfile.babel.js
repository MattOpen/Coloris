"use strict";

import gulp from "gulp";
import uglify from "gulp-uglify";
import babel from "gulp-babel";
import replace from 'gulp-replace';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
const transpileSass = gulpSass(nodeSass);

const dirs = {
    src: "src/*.js",
    dest: "./dist",
    scss: "src/*.scss"
}

gulp.task("scripts", function() {
    return gulp.src(dirs.src)
      .pipe(babel({ presets: ['@babel/preset-env'] }))
      .pipe(replace('"use strict";', ''))
      //  transpile to ES5 and create JS file in destination
      .pipe(gulp.dest(dirs.dest))
      // Minify and rename to *.min.js
     .pipe(uglify({
       output: {
         comments: /^!/
       }
     }))
     .pipe(rename(function (path) {
       path.basename += '.min';
     }))
     .pipe(gulp.dest(dirs.dest));
});

gulp.task("styles", function() {
  return gulp.src(dirs.scss)
    .pipe(transpileSass().on('error', transpileSass.logError))
    //  transpile to CSS and create file in destination
    .pipe(gulp.dest(dirs.dest))
    // Minify and rename to *.min.css
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
       path.basename += '.min';
     }))
     .pipe(gulp.dest(dirs.dest));
  });

gulp.task("watch", () => {
    gulp.watch(dirs.src, ["build"]);
    gulp.watch(dirs.scss, ["transpileSCSS"]);
})

gulp.task("build", 
  gulp.series(gulp.parallel('styles', 'scripts'))
);



