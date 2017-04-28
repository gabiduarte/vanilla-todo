module.exports = function(grunt) {
  grunt.initConfig({
	  jasmine: {
      src: 'js/*.js',
      options: {
        specs: 'specs/*Spec.js',
        helpers: 'spec/SpecHelper.js'
      }
	  }
	});

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', 'jasmine');
};