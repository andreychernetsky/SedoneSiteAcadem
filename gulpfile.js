"use strict";

const gulp = require("gulp"),
 sass = require("gulp-sass"),
 plumber = require("gulp-plumber"),
 postcss = require("gulp-postcss"),
 autoprefixer = require("autoprefixer"),
 server = require("browser-sync").create(),
 mqpacker = require("css-mqpacker"),
 minify = require("gulp-csso"),
 rename = require("gulp-rename"),
 imagemin = require("gulp-imagemin"),
 svgstore = require("gulp-svgstore"),
 svgmin = require("gulp-svgmin"),
 run = require("run-sequence"),
 del = require("del");

gulp.task("style",()=> {
  gulp.src("sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer({browsers: [
      "last 2 versions"
    ]}),
    mqpacker({
      sort: true
    })
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream())
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  return gulp.src("build/img/icons/*.svg")
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("symbols.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
  .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html:update"]);
})

gulp.task("build", function(fn) {
  run("clean", "copy", "style", "images", "symbols", fn);
})

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});
