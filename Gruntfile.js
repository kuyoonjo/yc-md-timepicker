module.exports = grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //grunt task configuration will go here   
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    './gruntCache/min-safe/js/yc-md-timepicker.js': ['./src/js/yc-md-timepicker.js']
                }
            }
        },
        concat: {
            js: {
                src: ['./gruntCache/min-safe/js/*.js'],
                dest: './gruntCache/concat/app.js'
            }
        },
        copy: {
            js: {
                src: ['./gruntCache/concat/app.js'], 
                dest: './dist/yc-md-timepicker.js'
            },
        },
        uglify: {
            js: {
                src: ['./gruntCache/concat/app.js'],
                dest: './dist/yc-md-timepicker.min.js'
            }
        }
    })

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-ng-annotate')

    //register grunt default task
    grunt.registerTask('default', ['ngAnnotate', 'concat', 'copy', 'uglify'])
}