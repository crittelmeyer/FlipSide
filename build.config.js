/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: "build",
  compile_dir: "bin",

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, `html` is just our
   * main HTML file.
   */
  app_files: {
    server: {
      js: [ "src/server/**/*.js", "!src/server/**/*.min.js", "!src/server/js/lib/**" ],
    },

    client: {
      js: [ "src/client/**/*.js", "!src/client/**/*.min.js", "!src/client/js/lib/**" ],

      html: [ "src/index.html" ]
    }
  },

  test_files: {
    server: {
      js: [ "tests/server/**/*.js"]
    },

    client: {
      js: [ "tests/client/**/*.js"]
    }
  }
};