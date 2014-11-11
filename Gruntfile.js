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
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks("grunt-bumpx");
  grunt.loadNpmTasks("grunt-version");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Register tasks
  grunt.registerTask("default", ["test"]);
  grunt.registerTask("test", ["jshint", "intern"]);
  grunt.registerTask("build", ["default", "bump", "version", ]);//"uglify"]);
  // grunt.registerTask("build", ["default", "jsdoc", "bump", "version", "uglify"]);
};