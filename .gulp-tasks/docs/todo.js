'use strict'

module.exports = function (gulp, plumber, using, gIf, touch) {
  gulp.task('docs:todo', () => {
    const todo = require('gulp-todo')
    return gulp.src([`${global.CONFIG.src}/**/*.{css,js,html,pug}`].concat(global.CONFIG.exclude))
      .pipe(todo({ }))
      .pipe(gulp.dest(`${global.CONFIG.src}/docs/`))
  })
}