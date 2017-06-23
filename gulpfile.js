var gulp = require('gulp'),
	clean = require('gulp-clean'),
	inject = require('gulp-inject'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifyjs'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	minifyCss = require('gulp-minify-css'),
	livereload = require('gulp-livereload'),
	runSequence = require('run-sequence').use(gulp);


// Dependencias del proyecto se concatenan en el 
// orden que se listan y se minifica en un 
// único archivo  =>  /app/min/app.min.js
var _DEPENDENCIES = [
    './bower_components/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './node_modules/angular-resource/angular-resource.js',
    './node_modules/angular-sanitize/angular-sanitize.js',
    './node_modules/lodash/lodash.js',
    './app/app.js',
    './app/filters.js',
    './app/factories.js',
    './app/controllers.js',
    './app/directives.js'
];



// Build Final
gulp.task('build',function () {
  runSequence('clean', 'scripts', 'inject');
});


// Elimina la carptea de build cuando
// hay un cambio en app/*.js
gulp.task('clean', function () {
	return gulp.src('./www')
        .pipe(clean({force: true}));
});

// Inyección CSS y JS en el index final
gulp.task('inject' ,function () {
    
  var target = gulp.src('./index.html');
  
  var css, js;
  // JS output con Vendors y App
  var JSsources = gulp.src([
  		'./app/min/app.min.js'
  	], {read:false});

  // Css en estilos.css
  var CSSsources = gulp.src([
  		'./assets/css/min/*.css'
  	], {read:false});
 		

  // ESTRUCTURA FINAL EN EL BUILD /www
    gulp.src(['./server.js']).pipe(gulp.dest('./www/'));
    gulp.src(['./assets/images/*']).pipe(gulp.dest('./www/images'));
    gulp.src(['./assets/css/min/*']).pipe(gulp.dest('./www/css'));
    gulp.src(['./app/min/*']).pipe(gulp.dest('./www/js'));
    gulp.src(['./service.json']).pipe(gulp.dest('./www/js'));
    gulp.src(['./app/views/*']).pipe(gulp.dest('./www/views'));


    return target.pipe(inject(CSSsources,{
	                ignorePath: 'assets/css/min',
	                addRootSlash: false,
	                transform: function (filepath, file, i, length) {
                      return '<link rel="stylesheet" href="css/' + filepath + '">';
				    }
	          }))
  
  			   .pipe(inject(JSsources,{
	                ignorePath: 'app/min',
	                addRootSlash: false,
	                transform: function (filepath, file, i, length) {
				        return '<script type="text/javascript" src="js/' + filepath + '"></script>';
				    }
	          }))
  			   .pipe(gulp.dest('./www'))
  			   .pipe(livereload());
});


gulp.task('styles', function() {
    gulp.src('assets/css/estilos.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/css/min/'))
        .pipe(gulp.dest('www/css/'))
        .pipe(livereload());
});



gulp.task('scripts', function() {
    return gulp.src(_DEPENDENCIES)
    .pipe(concat('app.min.js'))
    /*.pipe(uglify({
      //mangle: true,
      output: {
      //  beautify: false
      },
      compress:{
        //drop_console : true //elimino comments
      }
    }))*/
    .pipe(gulp.dest('./app/min/'))
});


//Watch task
gulp.task('default',function() {
    livereload.listen();
    gulp.watch('assets/css/*.scss',['styles']);
    gulp.watch('./app/*.js',['build']);
});