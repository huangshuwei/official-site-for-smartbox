var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    uglifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    //pump = require('pump'), // 可以截获错误
    rename = require('gulp-rename'),
    clean = require('gulp-clean');


/*/!*
 * 压缩业务js
 * *!/
gulp.task('compressjs1', function () {
    gulp.src('src/js/!*.js')
        .pipe(uglify())
        //给压缩后的文件，添加min后缀名
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
});*/


/*
 * 压缩公共js
 * */
gulp.task('compressjs2', function () {
    gulp.src('public/js/*.js')
        .pipe(uglify())
        //给压缩后的文件，添加min后缀名
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js'))
});


/*
 * 压缩业务css
 * */
gulp.task('compresscss1', function () {
    gulp.src(['src/css/*.css','!src/css/examples.css','!src/css/api.css'])
        .pipe(uglifyCss())
        //给压缩后的文件，添加min后缀名
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
});

/*
 * 压缩公共css
 * */
gulp.task('compresscss2', function () {
    gulp.src('public/css/*/*.css')
        .pipe(uglifyCss())
        //给压缩后的文件，添加min后缀名
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'))
});


/*合并js并压缩*/
gulp.task('concat-compressjs', function () {
    gulp.src(['src/js/examples.js','public/js/jquery.smartbox.js','public/js/prettify.js'])
        .pipe(concat('libs_examples.js'))
        .pipe(uglify())
        //给压缩后的文件，添加min后缀名
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
});

/*合并css并压缩-examples*/
gulp.task('concat-examples', function () {
    gulp.src(['src/css/main.css','src/css/examples.css','public/css/prettify/prettify.css','public/css/smartbox/jquery.smartbox.css'])
        .pipe(concat('libs_examples.css'))
        .pipe(uglifyCss())
        //给压缩后的文件，添加min后缀名
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
});

/*合并css并压缩-api*/
gulp.task('concat-api', function () {
    gulp.src(['src/css/main.css','src/css/api.css'])
        .pipe(concat('libs_api.css'))
        .pipe(uglifyCss())
        //给压缩后的文件，添加min后缀名
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
});


gulp.task('clean', function () {
    return gulp.src(['dist/js/*', 'dist/css/*'], {read: false})
        .pipe(clean());
});

gulp.task('css_public',['compresscss2']);

gulp.task('js_public',['compressjs2']);


gulp.task('default', ['clean','compresscss1','concat-compressjs','concat-examples','concat-api']);