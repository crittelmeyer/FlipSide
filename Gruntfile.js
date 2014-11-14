module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt, {
    pattern: [
      "grunt-*",
      "intern"
    ]
  });

  /**
    * Load in our build configuration file.
    */
  var userConfig = require("./build.config.js");

  // Project configuration.
  var taskConfig = {
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      options: (function() {
        var options = grunt.file.readJSON(".jshintrc");
        options.reporter = require("jshint-stylish");

        return options;
      }()),
      source: {
        files: {
          src: ["<%= app_files.client.js %>", "<%= app_files.server.js %>"]
        }
      },
      tests: {
        options: (function() {
          var options = grunt.file.readJSON(".jshintrc");
          options.reporter = require("jshint-stylish");
          options.unused = false;
          options.expr = false;
          options.predef.push("describe");
          options.predef.push("it");
          options.predef.push("define");
          options.predef.push("beforeEach");
          options.predef.push("sinon");
          options.predef.push("devDependencies");
          return options;
        }()),
        files: {
          src: ["<%= test_files.client.js %>", "<%= test_files.server.js %>"]
        }
      },
      gruntfile: {
        options: (function() {
          var options = grunt.file.readJSON(".jshintrc");
          options.reporter = require("jshint-stylish");
          options.unused = false;
            return options;
        }()),
        files: {
          src: ["Gruntfile.js"]
        }
      }
    },


    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: "compressed"
        },
        files: [{ // Dictionary of files
          "build/styles.css": "src/styles/main.scss", // 'destination': 'source'
        }]
      }
    },


    autoprefixer: {
      options: {
        browsers: ["last 2 versions", "ie >= 9"],
        map: true //Automatically updates Sass's previously generated sourcemap! Cool!
      },
      main: {
        expand: true,
        flatten: true,
        src: "build/*.css", //output by sass
        dest: "bin/"
      }
    },


    intern: {
      client: {
        options: {
          // for other available options, see:
          // https://github.com/theintern/intern/wiki/Using-Intern-with-Grunt#task-options
          config: "tests/intern"
        }
      },
      clientSuiteGet: {
        // an example of specifying a suite name
        options: {
          config: "tests/intern",
          suites: ["tests/lib/get"]
        }
      },
      runner: {
        options: {
          config: "tests/intern",
          runType: "runner"
        }
      }
    },
    bump: {
      files: ["package.json"]
    },
    version: {
      defaults: {
        src: "src/server/server.js"
      }
    },
    browserify: {
      defaults: {
        src: "<%= app_files.js %>",
        dest: "<%= build_dir %>/bundle.js"
      },
      watch: {
        src: "<%= app_files.js %>"
      }
    },
    "closure-compiler": {
      server: {
        closurePath: "/Users/chrisrittelmeyer/Tools/closure-compiler",
        js: "<%= build_dir %>/bundle.js",
        jsOutputFile: "<%= build_dir %>/bundle.min.js",
        maxBuffer: 500,
        options: {
          compilation_level: "ADVANCED_OPTIMIZATIONS", // jshint ignore:line
          language_in: "ECMASCRIPT5_STRICT" // jshint ignore:line
        }
      }
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["default"]
    }
  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  // Register tasks
  grunt.registerTask("jshintVerbose", "Show all jshint errors and warings with associated codes", function() {
    grunt.config.set("jshint.options.force", true);
    grunt.config.set("jshint.options.verbose", true);
    grunt.task.run("jshint");
  });


  grunt.registerTask("styles", ["sass", "autoprefixer"]);

  grunt.registerTask("default", ["test"]);
  grunt.registerTask("test", ["jshint", "intern:client"]);
  grunt.registerTask("build", ["default", "bump", "version", "browserify:defaults", "closure-compiler"]);
  // grunt.registerTask("build", ["default", "jsdoc", "bump", "version", "uglify"]);
};