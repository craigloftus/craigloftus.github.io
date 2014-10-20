module.exports = function(grunt) {
	grunt.initConfig({
		// Uglify dev scripts
		uglify: {
			all : {
				files: {
				}
			}
		},
		// Copy only the stuff we need from bower_components
		copy: {
			all: {
				files: [
					// CSS
					{
						expand: true,
						flatten: true,
						src: [ 
							"bower_components/bootstrap/dist/css/bootstrap.min.css"
						],
						dest: "css/"
					},
					// FONTS
					{
						expand: true,
						flatten: true,
						src: [
							"bower_components/bootstrap/dist/fonts/*"
						],
						dest: "fonts/"
					}
				]
			}
		},
		less: {
			all: {
				options: {
					cleancss: true,
					report: "min"
				},
				files: [
					{
						src: ["less/*.less"],
						dest: "css/style.css"
					}
				]
			}
		},
		watch: {
			files: ['less/*.less'],
			tasks: ['less', 'uglify']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['copy', 'less', 'uglify']);
};
