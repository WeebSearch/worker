"use strict";
const gulp = require("gulp");
const cp = require("child_process");
const typedoc = require("gulp-typedoc");

gulp.task("typedoc", () => gulp
  .src(["typescript-worker/*.ts"])
  .pipe(typedoc({
    tsconfig: "tsconfig.json",
    out: "./docs",
    name: "Worker Documentation"
  }))
);
