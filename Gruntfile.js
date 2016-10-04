module.exports = function(grunt) {
   require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['src/js/src/tmpl.js',
                    'src/js/src/imagesloaded.pkgd.min.js',
                     'src/js/src/jquery.bxslider.js',
                     'src/js/src/masonry.pkgd.min.js',
                      'src/js/src/script.js'],
                // the location of the resulting JS file
                dest: 'public/script.main.js'
            }
        },
        uglify: {
            dist: {
                src: ['src/js/src/tmpl.js',
                    'src/js/src/imagesloaded.pkgd.min.js',
                     'src/js/src/jquery.bxslider.js',
                     'src/js/src/masonry.pkgd.min.js',
                     'src/js/src/script.js'],
                dest: 'public/script.main.min.js'
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/styles/src',
                    src: ['*.scss'],
                    dest: 'src/styles/dist',
                    ext: '.css'
                }]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/src',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/img'
                }]
            }
        },
        watch: {
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['src/styles/src/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['src/js/src/*.js'],
                tasks: ['uglify', 'concat'],
                options: {
                    spawn: false
                }
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["src/styles/dist/reset.css", "src/styles/dist/*.css"],
                dest: "public/styles.main.css"
            },
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [ require('autoprefixer')({browsers: 'ie 8'})], // add vendor prefixes
            },
            dist: {
                src: 'src/styles/src/IE8_styles.css',
                dest: 'public/IE8_styles.css'
            }
        }
    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'concat_css', 'postcss']);

};
