const gulp = require("gulp");
const webserver = require("gulp-webserver");
const sass = require("gulp-sass");
const watch = require("gulp-watch");
const webpack = require("webpack-stream");
//打包任务
gulp.task("build", ["refreshHTML","refreshJS","refreshCSS"]);
//复制HTML文件
gulp.task("refreshHTML", function(){
	return gulp.src("./src/**/*.html")
			.pipe( gulp.dest("./dist") );
});
//利用webpack插件打包编译JS
gulp.task("refreshJS", function () {
    gulp.src("./src/js/app.js")
		.pipe(
			webpack({
				mode : "development",
				entry : ["./src/js/app.js"],  //入口
				output : {   //出口
					filename : "app.js"
				},
				module : {
					rules: [ { test: /\.html$/, use: "string-loader" } ]  //html文件的loader
				}
			})
		)
		.pipe(gulp.dest("./dist/js"));
});
//编译SCSS文件
gulp.task("refreshCSS", function () {
    gulp.src("./src/**/*.scss")
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .on("error", sass.logError)
        .pipe(gulp.dest("./dist"));
});
//监听任务，监听文件内容及增删变化
gulp.task("watch", function(){
	watch("./src/**/*.html", function(){
		gulp.start("refreshHTML");
	});
	watch("./src/**/*.scss", function(){
		gulp.start("refreshCSS");
	})
	watch("./src/**/*.js", function(){
		gulp.start("refreshJS");
	})
});
//服务器任务
gulp.task('server', function(){
	return gulp.src("./dist")
			   .pipe( webserver({
					host:'localhost', 
					port: 8080,
					livereload: true
				}));
});
//默认任务，调用了服务器任务及监听任务。
gulp.task("default", ["server","watch"], function(){
	console.log('Server is started at localhost:8080');
});
