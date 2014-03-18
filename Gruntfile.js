module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jsbeautifier: {
            files: ['package.json', '*.js', 'app/**/*.js', 'config/**/*.js'],
            options: {
                js: {
                    jslintHappy: true
                }
            }
        },
        jshint: {
            all: ['*.js', 'app/**/*.js', 'config/**/*.js', '!public/lib/**/*.js']
        }
    });

    // Load the plugins that provides the tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    // Default task(s).
    grunt.registerTask('default', ['jsbeautifier', 'jshint']);

};
