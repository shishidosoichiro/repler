var gulp = require("gulp")
  , mocha = require("gulp-mocha")

var files = ["lib/**/*.js", "test/**/*.js"]

gulp.task("mocha", function(){
	return gulp.src(files)
	.pipe(mocha({reporter: "nyan"}))
})

gulp.task("default", function(){
	gulp.watch(files, ["mocha"])
})
