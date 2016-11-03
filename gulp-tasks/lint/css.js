'use strict'
let $ = require('gulp-load-plugins')()

module.exports = function (gulp) {
  gulp.task('lint:css', () => {
    return gulp.src('src/public/css/**/*.css')
      .pipe($.stylelint({
        failAfterError: false,
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ]
      }))
  })
}
