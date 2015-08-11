(function(){
    var basePath = 'sp-boostrap-forms/';
    var app = angular.module('sp.bootstrapForms', ['ui.bootstrap', 'ngMessages', 'spFormsTemplates']);

    //TODO: move this to a separate file to allow for production, and debug configurations
    app.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
    }]);

    app.constant('MODULE_ROOT_PATH', basePath);
    app.config(['$provide', Decorate]);

    app.provider('sp.bootstrapForms', function spBootstrapFormsProvider() {
        var currency = '£';
        var rootPath = '';
        return {
            setDefaults: function (options) {
                if(options) {
                    if (options.currency)
                        currency = options.currency;

                    if(options.rootPath)
                        rootPath = options.rootPath;
                }
            },
            $get: function () {
                return {
                    currency: currency,
                    rootPath: rootPath
                }
            }
        };
    });

    //we can use this function to load template overrides for the ui.boostrap templates
    function Decorate($provide) {
        $provide.decorator('timepickerDirective', function($delegate) {
            var directive = $delegate[0];
            directive.templateUrl = basePath + 'templates/bootstrap_overrides/simple_timepicker.html';
            return $delegate;
        });
    }
}());