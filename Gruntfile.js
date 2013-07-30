module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      app: {
        src: ['app/**/*.js'],
        dest: 'assets/js/app.js'
      },
      // Order of library load is important!
      libs: {
        src: [
          'assets/js/libs/jquery-1.9.1.js',
          'assets/js/libs/handlebars-1.0.0-rc.4.js',
          'assets/js/libs/ember-1.0.0-rc.6.js'
        ],
        dest: 'assets/js/libs.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      app: {
        src: 'assets/js/app.js',
        dest: 'assets/js/app.min.js'
      },
      libs: {
        src: 'assets/js/libs.js',
        dest: 'assets/js/libs.min.js'
      }
    },

    stylus: {
      compile: {
        files: {
          'assets/css/style.css': 'assets/css/*.styl'
        }
      }
    },

    watch: {
      libs: {
        files: ['assets/js/libs/*.js'],
        tasks: ['concat:libs', 'uglify:libs'],
        // options: {
        //   livereload: true
        // }
      },
      app: {
        files: ['app/**/*.js'],
        tasks: ['concat:app', 'uglify:app'],
        // options: {
        //   livereload: true
        // }
      },
      livereload: {
        files: ['*.html', 'assets/css/*.css', 'assets/js/app.min.js', 'assets/js/libs.min.js'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Load all of Grunt's tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', ['concat','uglify', 'stylus', 'watch']);

};
