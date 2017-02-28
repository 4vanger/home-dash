var webpack = require("webpack");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-webpack');

    var webpackConfig = require("./webpack.config.js");
    grunt.initConfig({
        express: {
            options: {},
            dev: {
                options: {
                    script: 'config/dev/express.js'
                }
            }
        },
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                )
            },
            "build-dev": {
                devtool: "sourcemap",
            }
        },
        watch: {
            app: {
                files: ["src/**/*.js"],
                tasks: ["webpack:build-dev"],
                options: {
                    spawn: false,
                }
            }
        }
    });

    // The development server (the recommended option for development)
    grunt.registerTask("default", ["dev"]);

    // Build and watch cycle (another option for development)
    // Advantage: No server required, can run app from filesystem
    // Disadvantage: Requests are not blocked until bundle is available,
    //               can serve an old app on too fast refresh
    grunt.registerTask("dev", ["webpack:build-dev", "express:dev", "watch:app"]);

    // Production build
    grunt.registerTask("prod", ["webpack:build"]);
};