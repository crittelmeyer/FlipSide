module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt, {
    pattern: [
      "grunt-*",
      "intern"
    ]
  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      files: [
        "Gruntfile.js",
        "src/**/*.js",
        "!src/**/*.min.js"
      ],
      options: {
        jshintrc: ".jshintrc",
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
    "closure-compiler": {
      server: {
        closurePath: "/Users/chrisrittelmeyer/Tools/closure-compiler",
        js: "src/server/Block.js",
        jsOutputFile: "src/server/Block.min.js",
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
  });

  // Register tasks
  grunt.registerTask("default", ["test"]);
  grunt.registerTask("test", ["jshint", "intern:client"]);
  grunt.registerTask("build", ["default", "bump", "version", "closure-compiler"]);
  // grunt.registerTask("build", ["default", "jsdoc", "bump", "version", "uglify"]);
};