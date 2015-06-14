module.exports = function(grunt) {

  grunt.initConfig({
    jshint: { files: ['Gruntfile.js', 'src/**/*.js'] },
    
    connect: {
      server: {
        options: {
          useAvailablePort: true,
          livereload: true,
          base: 'build',
        }
      }
    },
    
    browserify: {
      dist: {
        files: { 'build/js/main.js': 'src/js/main.js' },
        options: {
          watch: true,
          transform: ['partialify'],
          browserifyOptions: {
            debug: true,
            fullPaths: false
          }
        }
      }
    },
    
    sass: {
      options: {
            sourceMap: true,
            sourceMapContents: true
      },
      dist: {
        files: {
          'build/css/main.css': 'src/css/main.scss',
        }
      }
    },
    
    postcss: {
      options: {
        map: { inline: false },
        processors: [ require('autoprefixer-core')({browsers: '> 1%'}) ]
      },
      dist: { src: 'build/css/*.css' }
    },
    
    copy: {
      html:   { src: 'src/index.html', dest: 'build/index.html' },
      imgs:   { cwd: 'src/', expand: true, src: 'imgs/*.*', dest: 'build/' },
      videos: { cwd: 'src/', expand: true, src: 'videos/*.*', dest: 'build/' }
    },
    
    clean: ['build'],
    
    watch: {
      options: { livereload: true },
      html:   { files: 'src/*.html', tasks: 'newer:copy:html' },
      imgs:   { files: 'src/imgs/*.*', tasks: 'newer:copy:imgs' },
      videos: { files: 'src/videos/*.*', tasks: 'newer:copy:videos' },
      sass:   { files: 'src/css/**/*.scss', tasks: ['sass', 'postcss'] }
    }
    
  });

  require('jit-grunt')(grunt);
  grunt.registerTask('build', ['jshint', 'clean', 'browserify', 'sass', 'postcss', 'newer:copy']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
