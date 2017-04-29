module.exports = function(grunt) {
  grunt.initConfig({
	  jasmine: {
      src: 'js/script.js',
      options: {
        specs: 'specs/*Spec.js'
      }
	  }
	});

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', 'jasmine');
};