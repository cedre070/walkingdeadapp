var gulp = require('gulp'); // appel du module gulp
var browserSync = require ('browser-sync'); //appel de browserSync
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var notify = require("gulp-notify");
const autoprefixer = require('gulp-autoprefixer');
// rafraîchissement du browser
var reload  = browserSync.reload;
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
const size = require('gulp-size');
var uncss = require('gulp-uncss');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('default', function() {
  console.log('Ma tâche par défaut...')
});

gulp.task('browser-sync', function() {
  browserSync({
    port: 3000,
    server: {
      baseDir: "./", //base directory
      index: "app.html" //fichier à charger par défaut
    }
  });
});

// crée une tâche css
gulp.task('css', function() {
  console.log('Ma tâche css...')
  //gulp.src -> cherche un ou plusieurs fichiers sources à minifier
  return gulp.src(['./css/photo.css']) // src = source de fichiers
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(minifyCss()) // compresser ma css par le module gulp-minify-css
  .pipe(concat("bundle.css"))//concatenation en 1
  .pipe(size())

  .pipe(notify('CSS compressée et concatenée'))
  .pipe(uncss({
            html: ['app.html', 'posts/**/*.html', 'http://example.com']
        }))
  .pipe(reload({stream: true, once: true})) // je rafraîchis mon navigateur quand ma tâche css est accomplie
  .pipe(gulp.dest('dist/css/')); // permet d'envoyer le fichier minifié dans le répertoire de destination dist/css

});
// For js
gulp.task('js', function() {
  console.log('Ma tâche js...')
  return gulp.src(['js/*.js'])
  .pipe(concat("app.min.js"))
  .pipe(size())
  //.pipe(uglify())//minify js
  .pipe(gulp.dest('dist/js'))
  .pipe(notify('JS modifié'))
  .pipe(reload({stream: true, once:true}));

});


//je crée une tĉhe default
//Au lancement par default, la tâche browser-sync va se lancer
gulp.task('default', ['browser-sync','css','js'], function() {
  gulp.watch('./js/*.js', ['js']); // watch permet de "watcher", observer les changements de fichiers CSS du
  // dossier CSS et relncer la tâche "css"
  gulp.watch('./css/*.css', ['css']); // watch permet de "watcher", observer les changements de fichiers CSS du
  // dossier CSS et relncer la tâche "css"
  gulp.watch('./sass/*.scss', ['sass']); // watch permet de "watcher", observer les changements de fichiers CSS du
  // dossier CSS et relncer la tâche "css"
  console.log('Ma tâche par défaut...')
})
// crée une tâche sass
gulp.task('sass', function() {
  console.log('Ma tâche css...')

  return gulp.src(['sass/main.scss'])
  .pipe(sass().on('error',sass.logError))//compiler sass en css
  .pipe(sourcemaps.init())
  .pipe(autoprefixer({
    browser: ['> 1%', 'IE 7', 'Firefox <= 20', 'iOS 7']
  }))
  .pipe(minifyCss())
  .pipe(concat("bundle-sass.css"))
  .pipe(size())
  .pipe(notify('SASS compilée compressée et concatenée !'))
  .pipe(uncss({
            html: ['app.html', 'posts/**/*.html', 'http://example.com']
        }))
  .pipe(reload({stream: true, once: true}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/css/'));
});
