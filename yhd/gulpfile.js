const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const jsmin = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plugins = require('gulp-load-plugins')();
const path = require('path');
const spritesmith = require('gulp.spritesmith');
const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块

// 1. html的压缩
// npm i gulp-htmlmin -D
gulp.task('htmlmin', function() {
    return gulp
        .src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/html'));
});


// 2. css压缩
// npm i gulp-cssmin -D
gulp.task('cssmin', function() {
    return gulp
        .src('./src/style/*.css')
        .pipe(cssmin())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/style'));
})

// 3. 压缩js
// npm i gulp-uglify -D
gulp.task('jsmin', function() {
    return gulp
        .src(['./src/js/*.js', '!src/js/*.min.js'])
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'));
});

// 4. 压缩图片
// npm i gulp-imagemin -D
gulp.task('imagemin', function() {
    return gulp
        .src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

// 5. 合并文件
// npm i gulp-concat -D
gulp.task('concat', function() {
    return gulp
        .src(['./src/js/index.js', './src/js/jquery.js'])
        .pipe(concat('all.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'));
});

//5.转码，压缩的合并实现
//先将es6代码转换成es5才能进行相关的压缩合并操作。
//gulp-babel@7   @后面的数字代表版本
//gulp-babel@7  babel-core   babel-preset-es2015
gulp.task('babel', function () {
    return gulp.src(['./src/js/*.js', '!src/js/*.min.js','./src/js/lib/*.js'])
        .pipe(babel({//es6转es5
            presets: ['es2015']
        }))
        .pipe(jsmin())
        .pipe(gulp.dest('dist/js/'));
});



// 6. less编译
// npm i gulp-less -D
gulp.task('less', function() {
    return gulp
        .src('./src/style/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./src/style'));
});
// 6. sass编译
// npm i gulp-sass -D
gulp.task('sass', function() {
    return gulp
        .src('./src/style/*.sass')
        .pipe(sass({
            paths: [path.join(__dirname, 'sass', 'includes')]
        }))
        .pipe(gulp.dest('../style/css'));
});
//5.利用sass，生成压缩css。
gulp.task('compilesass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(plugins.sourcemaps.init()) // 初始化 gulp-sourcemaps 插件  生成.map文件初始化  
        .pipe(plugins.sass({ // 调用 sass 插件，编译 sass 文件
            outputStyle: 'compressed' //压缩一行
        }))
        .pipe(plugins.sourcemaps.write('.')) // 生成 sourcemap 生成.map文件 
        .pipe(gulp.dest('src/style/css'));
});
// 7. 文件监听
gulp.task('watchsass', function() {
    gulp.watch('./src/style/*.sass', gulp.series('sass'));
});

// 自动构建
gulp.task('dev', function() {
    gulp.watch(['./src/html/*.html', './src/js/*.js', './src/style/*.less'], gulp.series('htmlmin', 'concat', 'less', 'cssmin'));
});

// 精灵图
// npm i gulp.spritesmith 
gulp.task('sprite', function() {
    var spriteData = gulp.src('src/img/*').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('src/img'));
});