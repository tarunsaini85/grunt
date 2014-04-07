module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	min: {
		dynamic_mappings : '<%= mappingOptions.jsFiles %>'
	},
	cssmin: {
		dynamic_mappings : '<%= mappingOptions.cssFiles %>'
	},
    uglify: {
      dynamic_mappings : '<%= mappingOptions.jsFiles %>'
    },
	compass: {
		dev: {
		  options: {
			sassDir: 'src/sass',
			cssDir: 'src/c',
			cacheDir: 'src/sass/.sass-cache',
			noLineComments: true,
			outputStyle: 'compact'
			//environment: 'production',
		  }
		}
	},
	sass: {
		dist: {
		  options:{
			  //noCache:true,
			  cacheLocation: 'src/sass/.sass-cache'
		  },
		  files: [{
			expand: true,
			cwd: 'src/sass',
			src: ['*.scss'],
			dest: 'src/c',
			ext: '.css'
		  }]
		}
	},
	htmlhint: {
		dist: {
			options:{
				'tagname-lowercase' : true,
				'attr-lowercase' : true,
				'attr-value-double-quotes' : true,
				'doctype-first' : true,
				'tag-pair' : true,
				'tag-self-close' : true,
				'head-script-disabled' : true,
				'style-disabled' : true
			},
			src: ['src/html/*.html']
		}
	},
	jshint: {
		dist: {
			options: {
				curly: true,
				undef: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
				//'-W015': true
			},
			files: {
				src: ['src/j/*.js']
			}
		}
	},
	watch: {
		html : {
			files: ['src/html/*.html','src/html/*.htm'],
			tasks: ['htmlhint']
		},
		js : {
			files: ['src/j/*.js'],
			tasks: ['jshint']
		},
		sasstocss : {
			files : 'src/sass/*.scss',
			tasks : ['compass']
		}
		/*minifyFiles : {
			files : ['src/j/*.js','src/c/*.css'],
			tasks : ['minify']
		},*/
	},
	
	mappingOptions : {
	  jsFiles : {
		  files: [
			{
			  expand: true,
			  cwd: 'src/',
			  src: ['j/*.js'],
			  dest: 'gen/',
			  ext: '.min.js',
			  extDot: 'first'
			},
		  ],
	  },
	  cssFiles : {
		  files: [
			{
			  expand: true,
			  cwd: 'src/',
			  src: ['c/*.css'],
			  dest: 'gen/',
			  ext: '.min.css',
			  extDot: 'first'
			},
		  ],
	  },
	  imagemin: {
		  png: {                          // Target
			  options: {                       // Target options
				optimizationLevel: 7
			  },
			  files: [{
				expand: true,                  // Enable dynamic expansion
				cwd: 'src/i',                   // Src matches are relative to this path
				src: ['*.png'],   // Actual patterns to match
				dest: 'gen/i',
				ext: '.png'                // Destination path prefix
			  }]
		  },
		  jpg: {                          // Target
			  options: {                       // Target options
				progressive: true
			  },
			  files: [{
				expand: true,                  // Enable dynamic expansion
				cwd: 'src/i',                   // Src matches are relative to this path
				src: ['**/*.jpg'],   // Actual patterns to match
				dest: 'gen/i',
				ext: '.jpg'                 // Destination path prefix
			  }]
		  }
	  },   
	  clean: ['gen/c','gen/i','gen/j']
	}	
  });


  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  
  grunt.registerTask('minify', ['min','cssmin']);
  grunt.registerTask('default', ['htmlhint','jshint','compass']);
  grunt.registerTask('gen', ['minify']);
};