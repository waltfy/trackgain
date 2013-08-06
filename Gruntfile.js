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
        src: ['src/router.js',
              'src/adapters/*.js',
              'src/controllers/*.js',
              'src/helpers/*.js',
              'src/models/*.js',
              'src/routes/*.js',
              'src/views/*.js'],
        dest: 'dist/js/app.js'
      },
      libs: {
        src: [
          'src/bower_components/jquery/jquery.js',
          'src/bower_components/handlebars/handlebars.js',
          'src/bower_components/ember/ember.js',
          'src/bower_components/d3/d3.js',
          'src/bower_components/rickshaw/rickshaw.js'
        ],
        dest: 'dist/js/libs.js'
      }
    },

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['src/bower_components/font-awesome/css/*'], dest: 'dist/fonts/font-awesome/css/'},
          {expand: true, flatten: true, src: ['src/bower_components/font-awesome/font/*'], dest: 'dist/fonts/font-awesome/font/'},
          {expand: true, flatten: true, src: ['src/images/*'], dest: 'dist/img/'},
          {expand: true, flatten: true, src: ['src/index.html'], dest: 'dist/'}
        ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      app: {
        src: 'dist/js/app.js',
        dest: 'dist/js/app.min.js'
      },
      libs: {
        src: 'dist/js/libs.js',
        dest: 'dist/js/libs.min.js'
      }
    },

    emberTemplates: {
      compile: {
        options: {
          templateName: function(sourceFile) {
            return sourceFile.replace(/src\/templates\//, '');
          }
        },
        files: {
          "dist/js/templates.js": "src/templates/**/*.hbs"
        }
      }
    },

    stylus: {
      compile: {
        files: {
          'dist/css/style.css': 'src/styles/*.styl'
        }
      }
    },

    watch: {
      libs: {
        files: ['dist/js/libs/*.js'],
        tasks: ['concat:libs'],
        options: {
          livereload: true
        }
      },
      app: {
        files: ['src/**/*.js'],
        tasks: ['concat:app'],
        options: {
          livereload: true
        }
      },
      style: {
        files: ['dist/css/*.styl'],
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      },
      emberTemplates: {
        files: ['src/templates/**/*.hbs'],
        tasks: ['emberTemplates'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Load all of Grunt's tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', ['concat', 'stylus', 'copy', 'emberTemplates']);

};
