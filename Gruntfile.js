module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      files: [
        "Gruntfile.js",
        "src/**/*.js"
      ]
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
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["default"]
    }
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("intern");
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks("grunt-bumpx");
  grunt.loadNpmTasks("grunt-version");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Register tasks
  grunt.registerTask("default", ["test"]);
  grunt.registerTask("test", ["jshint", "intern:client"]);
  grunt.registerTask("build", ["default", "bump", "version", ]);//"uglify"]);
  // grunt.registerTask("build", ["default", "jsdoc", "bump", "version", "uglify"]);
};