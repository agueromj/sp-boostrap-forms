// Karma configuration, test changing this
// Generated on Fri Apr 10 2015 22:55:45 GMT+0100 (BST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../../jquery/dist/jquery.min.js',
            '../../lodash/lodash.min.js',
            '../../moment/min/moment.min.js',
            '../../angular/angular.min.js',
            '../../angular-mocks/angular-mocks.js',
            '../../angular-bootstrap/ui-bootstrap-tpls.min.js',
            '../*.js',
            '../directives/*.js',
            '../templates/*.html',
            '../templates/bootstrap_overrides/*.html',
            './helpers.js',
            '*Spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../templates/*.html':['ng-html2js'],
            '../templates/bootstrap_overrides/*.html':['ng-html2js']

        },

        ngHtml2JsPreprocessor: {
            stripPrefix: '.*/sp-boostrap-forms/',
            prependPrefix: 'sp-boostrap-forms/'
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
