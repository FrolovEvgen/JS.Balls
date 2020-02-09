"use strict";
//------------------------------------------------------------------------------
// INITIAL CONFIG
//------------------------------------------------------------------------------
var buildRoot = "./build",
    tmpRoot = "./tmp",
    publicRoot = "./public",
    srcRoot = "./src",
    path = {
        build: {
            html: buildRoot + "/",
            js: buildRoot + "/js/",
            css: buildRoot + "/css/",
            img: buildRoot + "/img/",
            fonts: buildRoot + "/fonts/"
        },
        public: {
            html: publicRoot + "/",
            js: publicRoot + "/js/",
            css: publicRoot + "/css/",
            img: publicRoot + "/img/",
            fonts: publicRoot + "/fonts/"
        },
        tmp: {
            css: tmpRoot + "/css/"
        },
        src: {
            html: srcRoot + "/html/*.html",
            htmlInclude: srcRoot + "/html/include/",
            js: srcRoot + "/js/*.js",
            css: srcRoot + "/css/*.styl",
            img: srcRoot + "/img/**/*.*",
            fonts: srcRoot + "/fonts/**/*.*"
        },
        watch: {
            html: srcRoot + "/html/**/*.html",
            js: srcRoot + "/js/**/*.js",
            css: srcRoot + "/css/**/*.styl",
            img: srcRoot + "/img/**/*.*",
            fonts: srcRoot + "/fonts/**/*.*"
        },
        clean: {
            public: publicRoot  + "/*",
            build: buildRoot + "/*"
        }
    },
    config = {
        server: {
            baseDir: publicRoot
        },
        tunnel: true,
        host: "localhost",
        port: 9000,
        logPrefix: "Reloader"
    },
    plugins = {},
    gulp = {};

//------------------------------------------------------------------------------
// PLUGIN PARSER
//------------------------------------------------------------------------------
function parsePlugin (pkg) {
    var name = "";
    if (pkg.indexOf("gulp-") === 0) {
        name = pkg.replace("gulp-", "").replace(/-/g, "");
        gulp[name] = require(pkg);
    } else {
        name = pkg.replace(/-/g, "");
        plugins[name] = require(pkg);
    }
}
Object.keys(require("./package.json")["dependencies"]).forEach(parsePlugin);
//------------------------------------------------------------------------------
// ERROR LOGGER
//------------------------------------------------------------------------------
function trace(error) {
    console.log([
        "",
        ("----------ERROR MESSAGE START----------").bold.red.underline,
        ("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
        error.message,
        ("----------ERROR MESSAGE END----------").bold.red.underline,
        ""
    ].join("\n"));
    this.end();
}
//------------------------------------------------------------------------------
// TASKS GROUP "PUBLIC"
//------------------------------------------------------------------------------
plugins.gulp.task("public:clean", function () {
    plugins.del([path.clean.public]);
});

plugins.gulp.task("public:html", function(){
    plugins.gulp.src(path.src.html)
        .pipe(gulp.htmlimport(path.src.htmlInclude))
        .pipe(gulp.htmlhint())
        .pipe(gulp.htmlhint.reporter())
        .pipe(plugins.gulp.dest(path.public.html))
        .on("error", trace)
        .pipe(plugins.browsersync.reload({stream: true}));
});
plugins.gulp.task("public:css", function(){
    plugins.gulp.src(path.src.css)
        .pipe(gulp.sourcemaps.init())
        .pipe(gulp.stylus({sourcemaps: true}))
        .pipe(gulp.csslint())
        .pipe(gulp.csslint.formatter())
        .pipe(gulp.autoprefixer("last 3 versions"))
        .pipe(gulp.sourcemaps.write("../maps"))
        .pipe(plugins.gulp.dest(path.public.css))
        .on("error", trace)
        .pipe(plugins.browsersync.reload({stream: true}));
});
plugins.gulp.task("public:js", function(){
    plugins.gulp.src(path.src.js)
        .pipe(gulp.sourcemaps.init())
        .pipe(gulp.rigger({sourcemaps: true}))
        .pipe(gulp.jshint())
        .pipe(plugins.gulp.dest(path.public.js))
        .on("error", trace)
        .pipe(plugins.browsersync.reload({stream: true}));
});
plugins.gulp.task("public:font", function() {
    plugins.gulp.src(path.src.fonts)
        .pipe(plugins.gulp.dest(path.public.fonts));
});
plugins.gulp.task("public:img", function(){
    plugins.gulp.src(path.src.img)
        .pipe(gulp.imagemin())
        .pipe(plugins.gulp.dest(path.public.img));
});
plugins.gulp.task("public:compile",
    ["public:html", "public:css", "public:js", "public:font", "public:img"]);

plugins.gulp.task("public:webserver", function () {
    plugins.browsersync(config);
});
plugins.gulp.task("public:watch", function(){
    plugins.gulp.watch([path.watch.html], function(event, cb) {
        plugins.gulp.start("public:html");
    });
    plugins.gulp.watch([path.watch.css], function(event, cb) {
        plugins.gulp.start("public:css");
    });
    plugins.gulp.watch([path.watch.js], function(event, cb) {
        plugins.gulp.start("public:js");
    });
    plugins.gulp.watch([path.watch.img], function(event, cb) {
        plugins.gulp.start("public:img");
    });
});
plugins.gulp.task("public:browser", ["public:webserver", "public:watch"]);

plugins.gulp.task("public",
    ["public:clean", "public:compile", "public:browser"]);
//------------------------------------------------------------------------------
// TASKS GROUP "BUILD"
//------------------------------------------------------------------------------
plugins.gulp.task("build:clean", function () {
    plugins.del([path.clean.build]);
});

plugins.gulp.task("build:html", function(){
    plugins.gulp.src(path.src.html)
        .pipe(gulp.htmlimport(path.src.htmlInclude))
        .pipe(gulp.htmlmin({collapseWhitespace: true}))
        .pipe(plugins.gulp.dest(path.build.html));
});
plugins.gulp.task("build:css", function(){
    plugins.gulp.src(path.src.css)
        .pipe(gulp.stylus())
        .pipe(gulp.autoprefixer())
        //.pipe(gulp.uncss({html: [path.build.html]}))
        .pipe(gulp.csso())
        .pipe(plugins.gulp.dest(path.build.css));
});
plugins.gulp.task("build:js", function(){
    plugins.gulp.src(path.src.js)
        .pipe(gulp.rigger())
        .pipe(gulp.uglify())
        .pipe(plugins.gulp.dest(path.build.js));
});
plugins.gulp.task("build:font", function() {
    plugins.gulp.src(path.src.fonts)
        .pipe(plugins.gulp.dest(path.build.fonts));
});
plugins.gulp.task("build:img", function(){
    plugins.gulp.src(path.src.img)
        .pipe(gulp.imagemin([
            gulp.imagemin.gifsicle({interlaced: true}),
            gulp.imagemin.mozjpeg({quality: 75, progressive: true}),
            gulp.imagemin.optipng({optimizationLevel: 5}),
            gulp.imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(plugins.gulp.dest(path.build.img));
});

plugins.gulp.task("build:compile", ["build:html", "build:css", "build:js",
    "build:font", "build:img"]);

plugins.gulp.task("build", ["build:clean", "build:compile"]);

plugins.gulp.task("clean", ["public:clean", "build:clean"]);
