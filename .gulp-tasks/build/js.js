'use strict'

module.exports = (gulp, $, argv) => {
  gulp.task('build:js', (done) => {
    return gulp.src(`${global.CONFIG.src}/assets/*.{js,jsx}`)
      .pipe($.if(!argv.all, $.changed(`${global.CONFIG.dist}/public/`, {extension: '.js'})))
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init({})))
      .pipe($.betterRollup({
        plugins: global.CONFIG.rollupPlugins
      }, {
        format: 'iife',
        useStrict: true
      }))
      .pipe($.rename((path) => { path.extname = '.js' }))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: (mapFilePath) => {
          return mapFilePath.replace(global.CONFIG.src, '').replace('node_modules/', '/node_modules/')
        }
      })))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touch())
  })

  gulp.task('build:js:all', (done) => {
    return gulp.src(`${global.CONFIG.src}/assets/*.{js,jsx}`)
      .pipe($.using(global.CONFIG.using))
      .pipe($.plumber())
      .pipe($.if(!argv.production, $.sourcemaps.init({})))
      .pipe($.betterRollup({
        plugins: global.CONFIG.rollupPlugins
      }, {
        format: 'cjs',
        useStrict: true
      }))
      .pipe($.if(!argv.production, $.sourcemaps.write('.', {
        mapSources: (mapFilePath) => {
          return mapFilePath.replace(global.CONFIG.src, '').replace('node_modules/', '/node_modules/')
        }
      })))
      .pipe($.rename((path) => { path.extname = '.js' }))
      .pipe(gulp.dest(`${global.CONFIG.dist}/public/`))
      .pipe($.touch())
  })
}

