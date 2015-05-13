// Karma configuration
// Generated on Fri Apr 10 2015 22:55:45 GMT+0100 (BST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../../../../../javascripts/',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'libs/jquery/dist/jquery.min.js',
            'libs/lodash/lodash.min.js',
            'libs/moment/min/moment.min.js',
            'libs/angular/angular.min.js',
            'libs/angular-mocks/angular-mocks.js',
            'libs/angular-bootstrap/ui-bootstrap.min.js',
            'libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'libs/jquery/dist/jquery.min.js',
            'src/shared/sp-boostrap-forms/*.js',
            'src/shared/sp-boostrap-forms/directives/*.js',
            'src/shared/sp-boostrap-forms/test/helpers.js',
            'src/shared/sp-boostrap-forms/test/*Spec.js',
            'src/shared/sp-boostrap-forms/templates/*.html',
            'src/shared/sp-boostrap-forms/templates/bootstrap_overrides/*.html'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/shared/sp-boostrap-forms/templates/*.html':['ng-html2js'],
            'src/shared/sp-boostrap-forms/templates/bootstrap_overrides/*.html':['ng-html2js']

        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor']
    });
};
